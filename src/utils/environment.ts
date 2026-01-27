/**
 * Check if the current environment is a CI environment.
 * Returns true when running in GitHub Actions or other CI systems.
 */
export function isCI(): boolean {
  return process.env.CI === 'true'
}
