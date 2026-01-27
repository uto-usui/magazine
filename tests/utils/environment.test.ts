import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { isCI } from '../../src/utils/environment'

describe('isCI', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return true when CI environment variable is "true"', () => {
    process.env.CI = 'true'
    expect(isCI()).toBe(true)
  })

  it('should return false when CI environment variable is not set', () => {
    delete process.env.CI
    expect(isCI()).toBe(false)
  })

  it('should return false when CI environment variable is "false"', () => {
    process.env.CI = 'false'
    expect(isCI()).toBe(false)
  })

  it('should return false when CI environment variable is empty string', () => {
    process.env.CI = ''
    expect(isCI()).toBe(false)
  })
})
