import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { load } from 'js-yaml'
import {
  LedgerSchema,
  PodcastConfigSchema,
  ScriptSchema,
  type Ledger,
  type LedgerEntry,
  type PodcastConfig,
  type Script,
} from './schema'

export const LEDGER_PATH = join(process.cwd(), 'state', 'tts-usage.json')

export async function loadPodcastConfig(path = join(process.cwd(), 'config', 'podcast.yml')): Promise<PodcastConfig> {
  return PodcastConfigSchema.parse(load(await readFile(path, 'utf-8')))
}

export async function loadScript(path: string): Promise<Script> {
  return ScriptSchema.parse(JSON.parse(await readFile(path, 'utf-8')))
}

export async function loadLedger(path = LEDGER_PATH): Promise<Ledger> {
  try {
    return LedgerSchema.parse(JSON.parse(await readFile(path, 'utf-8')))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { entries: [] }
    throw error
  }
}

/** 1セグメントごとに追記する。途中で落ちても、払った分は記録に残す */
export async function appendLedger(entry: LedgerEntry, path = LEDGER_PATH): Promise<Ledger> {
  const ledger = await loadLedger(path)
  ledger.entries.push(entry)
  await mkdir(dirname(path), { recursive: true })
  const tmp = `${path}.tmp`
  await writeFile(tmp, JSON.stringify(ledger, null, 2) + '\n')
  await rename(tmp, path)
  return ledger
}
