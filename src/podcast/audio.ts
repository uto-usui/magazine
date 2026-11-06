import { execFile } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)

async function ffmpeg(args: string[]) {
  await run('ffmpeg', ['-y', '-loglevel', 'error', ...args])
}

export async function durationSec(path: string): Promise<number> {
  const { stdout } = await run('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path,
  ])
  return Number(stdout.trim())
}

/** 1リクエストで返ってくる複数の WAV を1つにつなぐ */
export async function joinWavChunks(chunks: Buffer[], workDir: string, outPath: string) {
  const files: string[] = []
  for (const [i, chunk] of chunks.entries()) {
    const f = join(workDir, `chunk-${i}.wav`)
    await writeFile(f, chunk)
    files.push(f)
  }
  await concat(files, outPath, ['-ar', '24000', '-ac', '1'], workDir)
}

/** セグメントの間に無音を挟んで MP3 にする。話し言葉なのでモノラル 96kbps で足りる */
export async function buildEpisodeMp3(segmentWavs: string[], workDir: string, outPath: string, gapSec = 0.8) {
  const gap = join(workDir, 'gap.wav')
  await ffmpeg(['-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', String(gapSec), gap])
  const files = segmentWavs.flatMap((f, i) => (i === 0 ? [f] : [gap, f]))
  await concat(files, outPath, ['-ac', '1', '-b:a', '96k'], workDir)
}

async function concat(files: string[], outPath: string, outArgs: string[], workDir: string) {
  const list = join(workDir, `concat-${Date.now()}.txt`)
  await writeFile(list, files.map((f) => `file '${f.replaceAll("'", "'\\''")}'`).join('\n') + '\n')
  await ffmpeg(['-f', 'concat', '-safe', '0', '-i', list, ...outArgs, outPath])
}
