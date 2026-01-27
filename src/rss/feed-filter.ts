import type { Feed } from '../config/schema'
import { isCI } from '../utils/environment'

/**
 * Determine if a feed should be enabled based on its enabled setting and the current environment.
 *
 * @param feed - The feed configuration object
 * @returns true if the feed should be fetched, false otherwise
 *
 * Enabled values:
 * - true: Always enabled (default)
 * - false: Always disabled
 * - 'local': Enabled only in local environment (disabled in CI)
 */
export function isFeedEnabled(feed: Feed): boolean {
  const { enabled } = feed

  if (enabled === 'local') {
    return !isCI()
  }

  return enabled
}
