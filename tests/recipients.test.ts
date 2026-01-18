import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { loadRecipientsConfig, getEnabledRecipients } from '../src/config/recipients'
import type { Recipient } from '../src/config/recipients-schema'

// Mock fs/promises
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
}))

import { readFile } from 'node:fs/promises'
const mockReadFile = vi.mocked(readFile)

describe('loadRecipientsConfig', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should load and parse recipients.yml', async () => {
    const yamlContent = `
recipients:
  - email: user@example.com
    name: Test User
    enabled: true
`
    mockReadFile.mockResolvedValue(yamlContent)

    const config = await loadRecipientsConfig()

    expect(config.recipients).toHaveLength(1)
    expect(config.recipients[0].email).toBe('user@example.com')
    expect(config.recipients[0].name).toBe('Test User')
    expect(config.recipients[0].enabled).toBe(true)
  })

  it('should throw error for invalid YAML', async () => {
    const invalidYaml = `
recipients:
  - email: not-an-email
    name: Test
`
    mockReadFile.mockResolvedValue(invalidYaml)

    await expect(loadRecipientsConfig()).rejects.toThrow()
  })

  it('should throw error when file read fails', async () => {
    mockReadFile.mockRejectedValue(new Error('File not found'))

    await expect(loadRecipientsConfig()).rejects.toThrow('File not found')
  })
})

describe('getEnabledRecipients', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return only enabled recipients', async () => {
    const yamlContent = `
recipients:
  - email: enabled@example.com
    name: Enabled User
    enabled: true
  - email: disabled@example.com
    name: Disabled User
    enabled: false
  - email: default@example.com
    name: Default User
`
    mockReadFile.mockResolvedValue(yamlContent)

    const recipients = await getEnabledRecipients()

    expect(recipients).toHaveLength(2)
    expect(recipients.map((r: Recipient) => r.email)).toContain('enabled@example.com')
    expect(recipients.map((r: Recipient) => r.email)).toContain('default@example.com')
    expect(recipients.map((r: Recipient) => r.email)).not.toContain('disabled@example.com')
  })

  it('should return empty array if no enabled recipients', async () => {
    const yamlContent = `
recipients:
  - email: disabled@example.com
    name: Disabled User
    enabled: false
`
    mockReadFile.mockResolvedValue(yamlContent)

    const recipients = await getEnabledRecipients()

    expect(recipients).toHaveLength(0)
  })
})
