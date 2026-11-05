---
title: "Data Access Testing With @testcontainers"
source: "https://blog.master.dev/data-access-testing-with-testcontainers/"
publishedDate: "2026-11-04"
category: "css"
feedName: "Frontend Masters Blog"
author: "Adam Rackis"
---

With AI now writing the overwhelming majority of our code, testing and verification have never been more important. We probably all know how to write unit tests with something like [Jest](https://jestjs.io/) or [Vitest](https://vitest.dev/), or even verify that our front-end code behaves correctly using something like RTL.

But writing tests against data access code has always been harder. Unit tests should be fast and isolated; introducing an external database works against both goals.

Historically, a common approach would be to have a test database, and, for each test, add a `try` block and begin a transaction, possibly with a READ UNCOMMITTED isolation level depending on the database and test, insert data, verify, and in the `finally` block `rollback` the transaction. The downsides of this approach should be obvious. The complexity is high, as is the likelihood of different, concurrent tests interfering with each other while running on the same test database.

## Do you really need to unit test database code at all?

That’s actually a very reasonable question, and the answer, as it often is, is “it depends.” If your data access code is basic CRUD, inserting records and then reading them back, then no, you probably don’t need to bother writing tests for code with such low complexity.

But if your database logic is doing real work, consider tests to verify it behaves correctly. This post will show you how.

Let’s get started.

## Docker to the Rescue

These days we have better options than hacking around transactions; we have [Docker](https://www.docker.com/). Docker lets us spin up virtually anything in a completely isolated container, do what we want, and then let the container vanish into the ether. And to help utilize Docker for this very use case, there’s a nifty family of packages called `@testcontainers`. There are a number of modules within that family, and for this post we’ll be looking at `@testcontainers/postgresql`.

## Requirements

You’ll need Docker running locally on your machine. Install (and start) Docker Desktop (or a suitable alternative) if it isn’t already. If you’re worried about CI/CD, don’t. GitHub Actions’ Ubuntu runners include Docker, so these tests will run just fine there.

## Setting up our Database

You’ll likely lean on your agent of choice for this, but know that setting up your database is as simple as this:

`const postgres = await new PostgreSqlContainer("postgres:18-alpine").start();`Code language: TypeScript (typescript)

To get the URL to the database in that container, it’s just as simple:

`postgres.getConnectionUri();`Code language: TypeScript (typescript)

You’ll probably want to access this object in both the `beforeAll` hook of your tests to set things up, as well as the `afterAll` hook to tear it down. To declare this variable before assignment, without losing any typings, just lean on TypeScript a bit:

`let postgres: Awaited<ReturnType<PostgreSqlContainer["start"]>>;`Code language: TypeScript (typescript)

## Tearing Down our Database

To that end, here’s how we clean everything up in our `afterAll` hook:

`afterAll(async () => {   try {     await db.$client.end();     await postgres.stop();   } catch {} });`Code language: TypeScript (typescript)

## Scaffolding our Data

We want to run tests against complicated application queries, insertion logic, etc. We have a connection to an empty Postgres database in a Docker container, but before we can write any tests we’ll need to set up our schema. There are many ways to do this, but if you’re using Drizzle, it’s especially easy.

[The `drizzle-kit` CLI](https://orm.drizzle.team/docs/kit-overview) provides a seamless way to do database migrations. [I wrote about `drizzle-kit` here](https://blog.master.dev/drizzle-database-migrations/), so check that post out for a fuller introduction, but `drizzle-kit push` will send the database structure in my Drizzle objects over to a database. With a little code, I can use that command to run this migration on our Postgres database in our container.

`import { execFile } from "node:child_process"; import { promisify } from "node:util";  const execFileAsync = promisify(execFile);  export async function pushSchema(databaseUrl: string) {   try {     await execFileAsync("./node_modules/.bin/drizzle-kit", ["push", "--config=drizzle.config.ts", "--force"], {       cwd: process.cwd(),       env: {         ...process.env,         POSTGRES: databaseUrl,       },     });   } catch (error) {     console.error(error);     throw error;   } }`Code language: TypeScript (typescript)

The key piece is this line:

`POSTGRES: databaseUrl,`Code language: TypeScript (typescript)

My Drizzle config file reads the connection string from an environment variable of that name:

`import { defineConfig } from "drizzle-kit";  const connectionString = process.env.POSTGRES!;  export default defineConfig({   dialect: "postgresql",   schema: "./src/drizzle/schema.ts",   dbCredentials: {     url: connectionString,   },   out: "./src/drizzle", });`Code language: TypeScript (typescript)

So we can call it as simply as this:

`postgres = await new PostgreSqlContainer("postgres:18-alpine").start();  await pushSchema(postgres.getConnectionUri());`Code language: TypeScript (typescript)

## Our Use Case

I’ve been tinkering with a fitness tracking application lately. The workout storage structure is fully normalized. An individual workout contains one or more segments. Each segment contains one or more exercises. And each exercise contains one or more measurements, for how many reps you did, with how much weight, etc.

The function for inserting a workout runs to almost 100 lines. Here’s a small section of it:

``export const insertWorkout = async (db: DB, input: WorkoutState, userId: string) => {   const exerciseIds = Array.from(new Set(input.segments.flatMap(segment => segment.exercises.map(exercise => exercise.exerciseId))));    if (exerciseIds.length > 0) {     const [mismatchedExercise] = await db       .select({ securityCheckFailed: sql`0` })       .from(exercisesTable)       .where(         exists(           db             .select({ id: exercisesTable.id })             .from(exercisesTable)             .where(and(inArray(exercisesTable.id, exerciseIds), not(eq(exercisesTable.userId, userId)))),         ),       );      if (mismatchedExercise != null) {       throw new Error("One or more exercises were not found.");     }   }    if (input.workoutTemplateId != null) {     const [template] = await db       .select({ id: workoutTemplateTable.id })       .from(workoutTemplateTable)       .where(and(eq(workoutTemplateTable.id, input.workoutTemplateId), eq(workoutTemplateTable.userId, userId)));      if (!template) {       throw new Error(`Workout template ${input.workoutTemplateId} was not found.`);     }   }    return db.transaction(async tx => {     const [insertedWorkout] = await tx       .insert(workoutTable)       .values({         // values ...       })       .returning({ id: workoutTable.id });      for (const [segmentIndex, segment] of input.segments.entries()) {       const [insertedSegment] = await tx         .insert(workoutSegmentTable)         .values({           // values ...         })         .returning({ id: workoutSegmentTable.id });        for (const [exerciseIndex, exercise] of segment.exercises.entries()) {         const exerciseUnitValues = createExerciseUnitValues(exercise);          const [insertedExercise] = await tx           .insert(workoutSegmentExerciseTable)           .values({             // values ..           })           .returning({ id: workoutSegmentExerciseTable.id });          const exerciseMeasurements = createExerciseMeasurements(exercise);         if (exerciseMeasurements.length > 0) {           await tx.insert(workoutSegmentExerciseMeasurementTable).values(             exerciseMeasurements.map((measurement: (typeof exerciseMeasurements)[number]) => ({               workoutSegmentExerciseId: insertedExercise.id,               ...measurement,             })),           );         }       }     }      return insertedWorkout.id;   }); };``Code language: TypeScript (typescript)

The method for querying a workout is equally complex, doing multiple joins and then reassembling the data.

``export const getWorkouts = async (db: DB, options: GetWorkoutsOptions): Promise<WorkoutsPayload> => {   await new Promise(resolve => setTimeout(resolve, DELAY_MS));   const page = Math.max(1, Math.floor(options.page ?? 1));   const offset = (page - 1) * WORKOUT_HISTORY_LIMIT;    const whereConditions: SQLWrapper[] = [eq(workoutTable.userId, options.userId)];   if (options.id != null) {     whereConditions.push(eq(workoutTable.id, options.id));   }    const workoutIds = db.$with("valid_workouts").as(     db       .select({         workout_id: sql<number>`${workoutTable.id}`.as("workout_id"),       })       .from(workoutTable)       .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)       .orderBy(desc(workoutTable.workoutDate), desc(workoutTable.id))       .limit(WORKOUT_HISTORY_QUERY_LIMIT)       .offset(offset),   );    const rows = await db     .with(workoutIds)     .select({       workoutId: workoutTable.id,       workoutTemplateId: workoutTable.workoutTemplateId,       workoutName: workoutTable.name,       workoutDescription: workoutTable.description,       workoutDate: workoutTable.workoutDate,       segmentRowId: workoutSegmentTable.id,       workoutTemplateSegmentId: workoutSegmentTable.workoutTemplateSegmentId,       segmentOrder: workoutSegmentTable.segmentOrder,       segmentSets: workoutSegmentTable.sets,       exerciseRowId: workoutSegmentExerciseTable.id,       workoutTemplateSegmentExerciseId: workoutSegmentExerciseTable.workoutTemplateSegmentExerciseId,       exerciseOrder: workoutSegmentExerciseTable.exerciseOrder,       exerciseExerciseId: workoutSegmentExerciseTable.exerciseId,       exerciseExecutionType: workoutSegmentExerciseTable.executionType,       exerciseDurationUnit: workoutSegmentExerciseTable.durationUnit,       exerciseDistanceUnit: workoutSegmentExerciseTable.distanceUnit,       exerciseWeightUnit: workoutSegmentExerciseTable.exerciseWeightUnit,       measurementId: workoutSegmentExerciseMeasurementTable.id,       workoutTemplateSegmentExerciseMeasurementId: workoutSegmentExerciseMeasurementTable.workoutTemplateSegmentExerciseMeasurementId,       templateReps: workoutSegmentExerciseMeasurementTable.templateReps,       templateRepsToFailure: workoutSegmentExerciseMeasurementTable.templateRepsToFailure,       templateWeightUsed: workoutSegmentExerciseMeasurementTable.templateWeightUsed,       templateDuration: workoutSegmentExerciseMeasurementTable.templateDuration,       templateDistance: workoutSegmentExerciseMeasurementTable.templateDistance,       measurementSetOrder: workoutSegmentExerciseMeasurementTable.setOrder,       measurementReps: workoutSegmentExerciseMeasurementTable.reps,       measurementWeightUsed: workoutSegmentExerciseMeasurementTable.weightUsed,       measurementDuration: workoutSegmentExerciseMeasurementTable.duration,       measurementDistance: workoutSegmentExerciseMeasurementTable.distance,     })     .from(workoutTable)     .innerJoin(workoutIds, eq(workoutTable.id, workoutIds.workout_id))     .leftJoin(workoutSegmentTable, eq(workoutSegmentTable.workoutId, workoutTable.id))     .leftJoin(workoutSegmentExerciseTable, eq(workoutSegmentExerciseTable.workoutSegmentId, workoutSegmentTable.id))     .leftJoin(       workoutSegmentExerciseMeasurementTable,       eq(workoutSegmentExerciseMeasurementTable.workoutSegmentExerciseId, workoutSegmentExerciseTable.id),     )     .orderBy(       desc(workoutTable.workoutDate),       desc(workoutTable.id),       asc(workoutSegmentTable.segmentOrder),       asc(workoutSegmentExerciseTable.exerciseOrder),       asc(workoutSegmentExerciseMeasurementTable.setOrder),     );    // then loop and put it all back together };``Code language: TypeScript (typescript)

**Note:** A less normalized structure would certainly be simpler, but this approach lets me query workout progress for individual exercises and such much more easily.

## Writing our Tests

We have our Postgres database ready, with our schema scaffolded. And we have our use case.

Let’s write code to insert some workouts, then query them back and confirm everything matches. Getting data ready to insert into multiple tables is certainly a pain, but we have AI agents to lean on for tedious, rote tasks like that. Here’s what my process looked like.

I started with this:

`function createWorkout(name: string, date: string): WorkoutState {   return {     name,     workoutDate: date,   }; }`Code language: TypeScript (typescript)

Then I gave this quick and dirty prompt to Claude:

> Jump in @src/data/workouts/workouts.test.ts and see createWorkout
> 
> Create a new type that is SegmentWithExercises but without segmentOrder or sets. Inside of it, the exercises array should be a new type that’s WorkoutSegmentExerciseState but without exerciseOrder. Then inside that, use a new type for measurements that’s WorkoutSegmentExerciseMeasurementState but without setOrder.
> 
> When done, adjust createWorkout to also take an array of your new top-level type
> 
> Start there and stop

And lo and behold:

`type TestMeasurement = Omit<WorkoutSegmentExerciseMeasurementState, "setOrder">;  type TestExercise = Omit<WorkoutSegmentExerciseState, "exerciseOrder" | "measurements"> & {   measurements: TestMeasurement[]; };  type TestSegment = Omit<SegmentWithExercises, "segmentOrder" | "sets" | "exercises"> & {   exercises: TestExercise[]; };  function createWorkout(name: string, date: string, segments: TestSegment[]): WorkoutState {   return {     name,     workoutDate: date,   }; }`Code language: TypeScript (typescript)

Everything looked good to start, so I continued with this:

> cool now finish the function. Expand segments: TestSegment\[\] to the full type – use common sense in filling out details. segmentOrder should increment from 0, and so on. for sets: number, just reach down and get the length of measurements for the 0th exercise sent in (assume there’ll always be at least 1)

And voilà:

`function createWorkout(name: string, date: string, segments: TestSegment[]): WorkoutState {   return {     name,     workoutDate: date,     segments: segments.map((segment, segmentIdx) => ({       ...segment,       segmentOrder: segmentIdx,       sets: segment.exercises[0].measurements.length,       exercises: segment.exercises.map((exercise, exerciseIdx) => ({         ...exercise,         exerciseOrder: exerciseIdx,         measurements: exercise.measurements.map((measurement, measurementIdx) => ({           ...measurement,           setOrder: measurementIdx,         })),       })),     })),   }; }`Code language: TypeScript (typescript)

And then:

> Now go in createWorkout and extract the mapping from TestSegment to SegmentWithExercises into a standalone function so I can reuse it elsewhere

`function createWorkout(name: string, date: string, segments: TestSegment[]): WorkoutState {   return {     name,     workoutDate: date,     segments: segments.map(toSegmentWithExercises),   }; }  function toSegmentWithExercises(segment: TestSegment, segmentIdx: number): SegmentWithExercises {   return {     ...segment,     segmentOrder: segmentIdx,     sets: segment.exercises[0].measurements.length,     exercises: segment.exercises.map((exercise, exerciseIdx) => ({       ...exercise,       exerciseOrder: exerciseIdx,       measurements: exercise.measurements.map((measurement, measurementIdx) => ({         ...measurement,         setOrder: measurementIdx,       })),     })),   }; }`Code language: TypeScript (typescript)

That was _almost_ what I wanted. I often prefer quick iterations like this, rather than meticulously trying to one-shot something.

> no sorry – take in the array and spit back out the mapped array

Finally, I had what I wanted:

`function createWorkout(name: string, date: string, segments: TestSegment[]): WorkoutState {   return {     name,     workoutDate: date,     segments: toSegmentsWithExercises(segments),   }; }  function toSegmentsWithExercises(segments: TestSegment[]): SegmentWithExercises[] {   return segments.map((segment, segmentIdx) => ({     ...segment,     segmentOrder: segmentIdx,     sets: segment.exercises[0].measurements.length,     exercises: segment.exercises.map((exercise, exerciseIdx) => ({       ...exercise,       exerciseOrder: exerciseIdx,       measurements: exercise.measurements.map((measurement, measurementIdx) => ({         ...measurement,         setOrder: measurementIdx,       })),     })),   })); }`Code language: TypeScript (typescript)

## Writing Some Actual Tests

I made one or two small tweaks to what the model produced after seeing what I had and what I wanted. Changes so small I just did them by hand. Here’s the final version of my utilities, omitting the pieces that didn’t change.

`type TestWorkoutState = Omit<WorkoutState, "segments"> & {   segments: TestSegment[]; };  function createWorkout(workoutInput: TestWorkoutState): WorkoutState {   return {     name: workoutInput.name,     workoutDate: workoutInput.workoutDate,     segments: toSegmentsWithExercises(workoutInput.segments),   }; }  function toSegmentsWithExercises(segments: TestSegment[]): SegmentWithExercises[] {   return segments.map((segment, segmentIdx) => ({     ...segment,     segmentOrder: segmentIdx,     sets: segment.exercises[0].measurements.length,     exercises: segment.exercises.map((exercise, exerciseIdx) => ({       ...exercise,       exerciseOrder: exerciseIdx,       measurements: exercise.measurements.map((measurement, measurementIdx) => ({         ...measurement,         setOrder: measurementIdx,       })),     })),   })); }`Code language: TypeScript (typescript)

Again, I literally spent only a few minutes generating these helpers with Claude. AI not only increases the value of these tests, it also makes their creation much simpler.

Here’s my test setup:

`beforeAll(   async () => {     postgres = await new PostgreSqlContainer("postgres:18-alpine").start();      await pushSchema(postgres.getConnectionUri());      const pool = new Pool({       connectionString: postgres.getConnectionUri(),     });      db = getDb(pool);      const [insertedBenchPress, insertedPushup] = await db       .insert(exercises)       .values([         { ...benchPress, userId },         { ...pushUp, userId },       ])       .returning({ id: exercises.id });      benchPress.id = insertedBenchPress.id;     pushUp.id = insertedPushup.id;   },   60 * 1000 * 5, );`Code language: TypeScript (typescript)

And here’s my first test:

`test("Insert simple workout with one exercise", async () => {   const workoutInput: TestWorkoutState = {     name: "Workout A",     workoutDate: "10/06/2026",     segments: [       {         exercises: [           {             exerciseId: benchPress.id!,             measurements: [               {                 weightUsed: 225,                 reps: 8,               },               {                 weightUsed: 225,                 reps: 7,               },               {                 weightUsed: 225,                 reps: 6,               },             ],           },         ],       },     ],   };    const workout = createWorkout(workoutInput);    await insertWorkout(db, workout, userId);    const result = await getWorkouts(db, { userId });    expect(result.workouts[0]).toMatchObject(workoutInput); });`Code language: TypeScript (typescript)

And the test passes.

![Vitest output: workouts.test.ts, 1 test, Insert simple workout with one exercise, passed in 14ms. Test Files 1 passed, Tests 1 passed, Duration 2.30s.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/testcontainers-test-passes.jpg?resize=810%2C236&quality=89&ssl=1)

There’s no sleight of hand here. I’m inserting that object graph into my multiple normalized tables using the same method my application code uses, then reconstructing it again with the same method my application uses, with that large join you saw before. And I’m verifying that everything gets put back together correctly.

A testing purist might argue that I’m doing too much in this test, that I should insert the workout and verify that the rows are in the right tables. And then a second test inserting those rows into the right tables, and then calling `getWorkouts` and verifying that they join and construct correctly. Honestly I prefer it this way. The test is less fragile. A change in database schema would not require any changes to this test. How the test data is inserted and read back is opaque to this test; it cares only that it comes back out in the same form it went in.

## Testing the Test

To really, truly verify what I just said was true, I went ahead and changed this line in the query method (which puts the workout back together) from this:

`.leftJoin(workoutSegmentTable, eq(workoutSegmentTable.workoutId, workoutTable.id))`Code language: TypeScript (typescript)

To this:

`.leftJoin(workoutSegmentTable, eq(workoutSegmentTable.workoutId, -1))`Code language: TypeScript (typescript)

And lo and behold:

![Vitest failure output. AssertionError: expected object to match workout input. The diff shows the expected segments array with exercises and measurements, but the received segments array is empty.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/testcontainers-test-failure-1.jpg?resize=966%2C1024&quality=89&ssl=1)

The test fails.

And just for fun, I’ll revert that (and verify the test passes again) and then break the insertion by changing this:

`for (const [segmentIndex, segment] of input.segments.entries()) {   const [insertedSegment] = await tx     .insert(workoutSegmentTable)     .values({       workoutId: insertedWorkout.id,       workoutTemplateSegmentId: segment.workoutTemplateSegmentId,       segmentOrder: segmentIndex + 1,       sets: segment.sets,     })     .returning({ id: workoutSegmentTable.id });    // ... }`Code language: TypeScript (typescript)

To this:

`for (const [segmentIndex, segment] of input.segments.entries()) {   continue; // <---- HERE   const [insertedSegment] = await tx     .insert(workoutSegmentTable)     .values({       workoutId: insertedWorkout.id,       workoutTemplateSegmentId: segment.workoutTemplateSegmentId,       segmentOrder: segmentIndex + 1,       sets: segment.sets,     })     .returning({ id: workoutSegmentTable.id });    // ... }`Code language: TypeScript (typescript)

Again, things don’t read back correctly.

![Vitest failure output showing the same assertion error: the expected segments array is populated but the received segments array is empty.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/testcontainers-test-failure-2.jpg?resize=1024%2C892&quality=89&ssl=1)

Obviously a bug that overt would probably be caught without tests; the point is that a more subtle bug would also be caught.

At the risk of belaboring an obvious point, consider something as silly as ordering the measurement sets wrongly:

`.orderBy(   desc(workoutTable.workoutDate),   desc(workoutTable.id),   asc(workoutSegmentTable.segmentOrder),   asc(workoutSegmentExerciseTable.exerciseOrder),   desc(workoutSegmentExerciseMeasurementTable.setOrder), // <------ should be asc );`Code language: TypeScript (typescript)

![Vitest failure output. The diff shows the first measurement expected reps 8 but received 6, and the last expected reps 6 but received 8. Summary: 1 failed, 22 passed.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/testcontainers-test-failure-3.jpg?resize=966%2C1024&quality=89&ssl=1)

Any bug that causes our object graph to come back in a different structure than what we inserted will fail our test.

## These Tests Aren’t Free (or Fast)

As you can see, the test suite takes over a second to set up and run; that’s the container getting created. For complicated logic like you saw, that time is well spent verifying everything works correctly. But please don’t abuse this tool and clutter your app with dozens or even hundreds of trivial tests verifying simple things.

With AI helping us spit out tests quickly, it’s never been easier to create spam like that, so be discerning!

## Wrapping Up

Hopefully this post has shown you useful tools for writing meaningful tests for your data access code.

The `@testcontainers` package will get Docker containers running right inside your Vitest tests. Spin up an empty database, use your existing data access utilities to make sure things work exactly as expected. And remember, more tests are absolutely not always better. Test the meaningful parts of your application, with non-trivial logic. Tests that verify every basic CRUD operation are unlikely to add much value and are very likely to slow your test suite to a crawl.