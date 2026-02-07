# Repository Guidelines

## Project Structure & Module Organization
- `src/` houses the TypeScript source. Key entry points are `src/index.ts` (RSS fetch pipeline) and `src/send-newsletter.ts` (email sender).
- `src/rss/`, `src/scraper/`, `src/storage/`, and `src/newsletter/` group the core pipeline stages.
- `config/` stores YAML configuration (`feeds.yml`, `categories.yml`, `recipients.yml`).
- `articles/` and `images/` are generated outputs; `state/processed.json` tracks processed items.
- `tests/` contains Vitest suites (e.g., `tests/diff.test.ts`).
- `dist/` is the build output from `pnpm run build`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies.
- `pnpm run build`: compile TypeScript into `dist/`.
- `pnpm run type-check`: strict type check only (also runs via `lefthook` pre-commit).
- `pnpm test`: run the full Vitest suite.
- `pnpm test tests/converter.test.ts`: run a single test file.
- `pnpm run fetch-rss`: fetch feeds and write new articles to `articles/YYYY-MM-DD/`.
- `pnpm run send-newsletter newsletters/<file>.md`: send a newsletter email (requires `RESEND_API_KEY`).

## Coding Style & Naming Conventions
- TypeScript with `strict` enabled (see `tsconfig.json`).
- Use 2-space indentation in code and YAML configs to match existing files.
- File naming: kebab-case for directories (`send-newsletter.ts`), `*.test.ts` for tests.
- Prefer clear, explicit types at module boundaries; schemas live in `src/config/*.ts`.

## Testing Guidelines
- Framework: Vitest.
- Place tests under `tests/` and name files `<module>.test.ts`.
- Add tests for new parsing or transformation logic (e.g., RSS diffing, conversion, extraction).

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`.
- PRs for feed updates are often auto-generated; for code changes, include a concise description, test evidence (command + outcome), and screenshots only when output formatting changes.

## Security & Configuration Tips
- Do not commit secrets. Local email sending requires a `.env` file with `RESEND_API_KEY`.
- Use `enabled: local` in `config/feeds.yml` for feeds that only work outside CI.

## Agent-Specific Notes
- See `CLAUDE.md` for the authoritative pipeline flow, error handling, and examples.
