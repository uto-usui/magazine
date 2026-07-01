import { describe, it, expect } from 'vitest'
import { normalizeUrl } from '../src/utils/url'

describe('normalizeUrl', () => {
  it('removes utm_* parameters', () => {
    expect(
      normalizeUrl(
        'https://ics.media/entry/12345/?utm_source=atom&utm_medium=referral&utm_campaign=feed',
      ),
    ).toBe('https://ics.media/entry/12345/')
  })

  it('keeps non-tracking query parameters', () => {
    expect(
      normalizeUrl('https://example.com/post?id=42&utm_source=twitter'),
    ).toBe('https://example.com/post?id=42')
  })

  it('removes common tracker names', () => {
    expect(
      normalizeUrl('https://example.com/post?fbclid=abc&gclid=xyz&keep=1'),
    ).toBe('https://example.com/post?keep=1')
  })

  it('strips the fragment', () => {
    expect(normalizeUrl('https://example.com/post#section')).toBe(
      'https://example.com/post',
    )
  })

  it('returns the input unchanged when it is not a valid URL', () => {
    expect(normalizeUrl('not-a-url')).toBe('not-a-url')
  })

  it('returns empty string for empty input', () => {
    expect(normalizeUrl('')).toBe('')
  })

  it('is idempotent', () => {
    const url =
      'https://ics.media/entry/12345/?utm_source=atom&utm_medium=referral&keep=1'
    expect(normalizeUrl(normalizeUrl(url))).toBe(normalizeUrl(url))
  })
})
