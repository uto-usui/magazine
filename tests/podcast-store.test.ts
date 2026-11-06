import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm, utimes, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { acquireLock, appendLedger, loadLedger } from '../src/podcast/store'

const DIR = join(process.cwd(), 'test-podcast-store')
const LOCK = join(DIR, '.lock')

describe('acquireLock', () => {
  beforeEach(() => mkdir(DIR, { recursive: true }))
  afterEach(() => rm(DIR, { recursive: true, force: true }))

  it('ほかが持っている間は取れず、解放すれば取れる', async () => {
    const release = await acquireLock(LOCK)
    expect(release).not.toBeNull()
    expect(await acquireLock(LOCK)).toBeNull()
    await release!()
    expect(await acquireLock(LOCK)).not.toBeNull()
  })

  it('古いロックは落ちたプロセスの残りとみなして取り直す', async () => {
    await writeFile(LOCK, '1\n')
    const old = new Date(Date.now() - 3 * 60 * 60 * 1000)
    await utimes(LOCK, old, old)
    expect(await acquireLock(LOCK)).not.toBeNull()
  })
})

describe('appendLedger', () => {
  beforeEach(() => mkdir(DIR, { recursive: true }))
  afterEach(() => rm(DIR, { recursive: true, force: true }))

  it('ファイルがなければ作り、追記していく', async () => {
    const path = join(DIR, 'usage.json')
    const entry = {
      at: '2026-11-06T00:00:00.000Z',
      date: '2026-11-06',
      episode: 'e',
      segment: 's',
      model: 'm',
      inputTokens: 1,
      outputTokens: 25,
      audioSec: 1,
      usd: 0.0001,
    }
    await appendLedger(entry, path)
    await appendLedger({ ...entry, segment: 's2' }, path)
    expect((await loadLedger(path)).entries.map((e) => e.segment)).toEqual(['s', 's2'])
  })
})
