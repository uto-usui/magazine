import type { PodcastConfig, Script } from './schema'

type Segment = Script['segments'][number]

export interface TtsResult {
  wavChunks: Buffer[]
  inputTokens: number
  outputTokens: number
}

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions'

/** 1セグメント（最大2話者）を Gemini 3.8 TTS の Interactions API で音声にする */
export async function synthesizeSegment(
  config: PodcastConfig,
  segment: Segment,
  apiKey: string
): Promise<TtsResult> {
  const { A, B } = config.speakers
  const body = {
    model: config.model,
    input: [
      {
        type: 'user_input',
        content: segment.lines.map((line) => {
          const sp = config.speakers[line.speaker]
          return {
            type: 'text',
            text: line.text,
            annotations: [{ type: 'speech_metadata', speaker: sp.name, ...(sp.style ? { style: sp.style } : {}) }],
          }
        }),
      },
    ],
    response_format: { type: 'audio' },
    generation_config: {
      speech_config: {
        speakers: [
          { speaker: A.name, voice: A.voice },
          { speaker: B.name, voice: B.voice },
        ],
      },
    },
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300_000),
  })
  if (!res.ok) {
    throw new TtsHttpError(res.status, await res.text())
  }

  const json = (await res.json()) as {
    steps?: { content?: { data?: string }[] }[]
    usage?: { total_input_tokens?: number; total_output_tokens?: number }
  }
  const wavChunks = (json.steps ?? [])
    .flatMap((s) => s.content ?? [])
    .filter((c): c is { data: string } => typeof c.data === 'string')
    .map((c) => Buffer.from(c.data, 'base64'))
  if (wavChunks.length === 0) throw new Error(`音声が返ってきませんでした: ${JSON.stringify(json).slice(0, 500)}`)

  return {
    wavChunks,
    inputTokens: json.usage?.total_input_tokens ?? 0,
    outputTokens: json.usage?.total_output_tokens ?? 0,
  }
}

export class TtsHttpError extends Error {
  constructor(
    readonly status: number,
    body: string
  ) {
    super(`Gemini TTS ${status}: ${body.slice(0, 500)}`)
  }

  /** 429 と 5xx だけ再試行する。4xx はリクエストの誤りなので、何度送っても直らない */
  get retryable() {
    return this.status === 429 || this.status >= 500
  }
}
