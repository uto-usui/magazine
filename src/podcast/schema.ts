import { z } from 'zod'

const SpeakerSchema = z.object({
  name: z.string().min(1),
  voice: z.string().min(1),
  style: z.string().default(''),
})

const DateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export const PodcastConfigSchema = z
  .object({
    model: z.string().min(1),
    speakers: z.object({ A: SpeakerSchema, B: SpeakerSchema }),
    budget: z.object({
      monthlyJpy: z.number().positive(),
      usdJpy: z.number().positive(),
      warnRatio: z.number().gt(0).lte(1),
    }),
    limits: z.object({
      maxScriptChars: z.number().int().positive(),
      maxEpisodesPerDay: z.number().int().positive(),
      estimateMargin: z.number().gte(1),
    }),
    speech: z.object({
      charsPerSecond: z.number().positive(),
      audioTokensPerSecond: z.number().positive(),
    }),
    pricing: z.object({
      model: z.string().min(1),
      periods: z
        .array(
          z.object({
            from: DateString,
            inputPerM: z.number().nonnegative(),
            outputPerM: z.number().nonnegative(),
          })
        )
        .min(1),
    }),
    video: z.object({
      appUrl: z.url(),
      style: z.string().min(1),
      preset: z.string().min(1),
      bitrateMbps: z.number().positive(),
      maxDurationSec: z.number().positive(),
      maxSizeMb: z.number().positive(),
    }),
  })
  .refine((c) => c.pricing.model === c.model, {
    message: 'pricing.model が model と一致しません。料金表を使うモデルのものに差し替えてください',
  })

export type PodcastConfig = z.infer<typeof PodcastConfigSchema>

export const ScriptSchema = z.object({
  episode: z.string().regex(/^\d{4}-\d{2}-\d{2}-\d{6}$/),
  newsletter: z.string().min(1),
  segments: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        title: z.string().min(1),
        // 記事のセグメントが紹介している元記事。Show Notes で、ニュースレターの記事との対応を確かめるのに使う
        url: z.url().optional(),
        lines: z
          .array(z.object({ speaker: z.enum(['A', 'B']), text: z.string().min(1) }))
          .min(1),
      })
    )
    .min(1),
})

export type Script = z.infer<typeof ScriptSchema>

export const LedgerEntrySchema = z.object({
  at: z.string(),
  date: DateString,
  episode: z.string(),
  segment: z.string(),
  model: z.string(),
  inputTokens: z.number(),
  outputTokens: z.number(),
  audioSec: z.number(),
  usd: z.number(),
})

export const LedgerSchema = z.object({ entries: z.array(LedgerEntrySchema) })

export type LedgerEntry = z.infer<typeof LedgerEntrySchema>
export type Ledger = z.infer<typeof LedgerSchema>

/** pnpm run podcast が MP3 と一緒に書き出す、セグメントごとの開始位置と長さ（秒） */
export const TimelineSchema = z.object({
  episode: z.string(),
  segments: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      start: z.number().nonnegative(),
      duration: z.number().positive(),
    })
  ),
})

export type Timeline = z.infer<typeof TimelineSchema>
export type TimelineSegment = Timeline['segments'][number]
