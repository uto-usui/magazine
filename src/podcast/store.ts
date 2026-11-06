import { mkdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
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
  const tmp = `${path}.${process.pid}.tmp`
  await writeFile(tmp, JSON.stringify(ledger, null, 2) + '\n')
  await rename(tmp, path)
  return ledger
}

/**
 * ほかの生成が動いていれば null を返す。落ちたプロセスのロックが残っていても、
 * 一定時間たったものは取り直す（1本の生成は数分で終わる）
 */
export async function acquireLock(path: string, staleMs = 2 * 60 * 60 * 1000): Promise<(() => Promise<void>) | null> {
  try {
    await writeFile(path, `${process.pid}\n`, { flag: 'wx' })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
    const age = Date.now() - (await stat(path)).mtimeMs
    if (age < staleMs) return null
    await rm(path, { force: true })
    return acquireLock(path, staleMs)
  }
  return () => rm(path, { force: true })
}
