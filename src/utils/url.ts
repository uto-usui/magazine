const TRACKING_PARAM_PREFIXES = ['utm_', 'mc_', '_hsenc', '_hsmi']
const TRACKING_PARAM_NAMES = new Set([
  'fbclid',
  'gclid',
  'yclid',
  'ref',
  'ref_src',
  'ref_url',
  'spm',
  'source',
])

function isTrackingParam(name: string): boolean {
  if (TRACKING_PARAM_NAMES.has(name)) return true
  return TRACKING_PARAM_PREFIXES.some((prefix) => name.startsWith(prefix))
}

export function normalizeUrl(url: string): string {
  if (!url) return url
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return url
  }

  const keys = [...parsed.searchParams.keys()]
  for (const key of keys) {
    if (isTrackingParam(key)) {
      parsed.searchParams.delete(key)
    }
  }

  parsed.hash = ''
  let normalized = parsed.toString()
  if (parsed.search === '' && normalized.endsWith('?')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}
