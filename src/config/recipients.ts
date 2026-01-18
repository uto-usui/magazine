import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'
import {
  RecipientsConfigSchema,
  type RecipientsConfig,
  type Recipient,
} from './recipients-schema'

const CONFIG_DIR = join(process.cwd(), 'config')

export async function loadRecipientsConfig(): Promise<RecipientsConfig> {
  const filePath = join(CONFIG_DIR, 'recipients.yml')
  const content = await readFile(filePath, 'utf-8')
  const data = yaml.load(content)

  return RecipientsConfigSchema.parse(data)
}

export async function getEnabledRecipients(): Promise<Recipient[]> {
  const config = await loadRecipientsConfig()
  return config.recipients.filter((recipient) => recipient.enabled)
}
