import { describe, it, expect } from 'vitest'
import { findVaultTail, mergeArticle } from '../src/obsidian-sync/merge'

const src = (body = '本文。\n', extra = '') =>
  `---\ntitle: "T"\nsource: "https://example.com/a"\npublishedDate: "2026-01-01"\ncategory: "css"\nfeedName: "Feed"${extra}\n---\n\n${body}`

const enrichTail = '---\n\n## Related Articles\n\n### By Tag\n- [[Articles/2026-01-02/b]] - 近い話題\n'
const igniteTail =
  '## Related Articles (Serendipity)\n<!-- ignite:auto:start -->\n- [[clips/c|C]] - 共通タグ: css\n<!-- ignite:auto:end -->\n'

describe('mergeArticle', () => {
  it('keeps a multi-line summary and tags that the source does not have', () => {
    const dest =
      '---\ntitle: "T"\nsource: "https://example.com/a"\ntags:\n  - css\nsummary: |\n  1960年代の話。\n\n  2 行目。\npublishedDate: "2026-01-01"\ncategory: "css"\nfeedName: "Feed"\n---\n\n本文。\n'
    const merged = mergeArticle(src(), dest)
    expect(merged).toContain('tags:\n  - css\n')
    expect(merged).toContain('summary: |\n  1960年代の話。\n\n  2 行目。\n')
    expect(merged).toBe(dest)
  })

  it('takes source values, drops keys the source removed, and adds keys the source added', () => {
    const dest =
      '---\ntitle: "Old"\nsource: "https://example.com/a"\ntags:\n  - css\npublishedDate: "2026-01-01"\ncategory: "css"\nfeedName: "Feed"\nauthor: "Gone"\n---\n\n本文。\n'
    const merged = mergeArticle(src('本文。\n', '\nfetchedBy: "scraper"').replace('"T"', '"New"'), dest)
    expect(merged).toContain('title: "New"')
    expect(merged).not.toContain('author:')
    expect(merged).toContain('fetchedBy: "scraper"')
    expect(merged).toContain('tags:\n  - css\n')
  })

  it('keeps both the enrich-articles and ignite sections when the body changes', () => {
    const dest = src(`古い本文。\n\n${enrichTail}\n${igniteTail}`)
    const merged = mergeArticle(src('新しい本文。\n'), dest)
    expect(merged).toContain('新しい本文。')
    expect(merged).not.toContain('古い本文。')
    expect(merged.endsWith(`${enrichTail}\n${igniteTail}`)).toBe(true)
  })

  it('does not treat a Related Articles heading in the source body as the vault tail', () => {
    const body = '本文。\n\n---\n\n## Related Articles\n\n- [Other](https://example.com/b)\n\n続き。\n'
    const dest = src(`${body}\n${enrichTail}`)
    const merged = mergeArticle(src(body), dest)
    expect(merged).toBe(dest)
    expect(findVaultTail(body)).toBe(-1)
  })

  it('keeps a section that only says no related notes were found', () => {
    const tail = '## Related Articles\n### My Notes\n- No related notes found\n'
    const merged = mergeArticle(src('新しい本文。\n'), src(`古い本文。\n\n${tail}`))
    expect(merged.endsWith(tail)).toBe(true)
  })

  it('stops instead of dropping a key when the source starts writing a key it does not own yet', () => {
    const dest = src('本文。\n').replace('feedName: "Feed"', 'feedName: "Feed"\ntags:\n  - css')
    expect(() => mergeArticle(src('本文。\n', '\ntags:\n  - rss'), dest)).toThrow(/SOURCE_KEYS/)
  })

  it('stops when the frontmatter cannot be read', () => {
    expect(() => mergeArticle(src(), 'no frontmatter')).toThrow(/frontmatter/)
  })
})
