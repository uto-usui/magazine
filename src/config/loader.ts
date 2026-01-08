import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import yaml from 'js-yaml'
import {
  FeedConfigSchema,
  CategoryConfigSchema,
  type FeedConfig,
  type CategoryConfig,
} from './schema'

const CONFIG_DIR = join(process.cwd(), 'config')

export async function loadFeedConfig(): Promise<FeedConfig> {
  const filePath = join(CONFIG_DIR, 'feeds.yml')
  const content = await readFile(filePath, 'utf-8')
  const data = yaml.load(content)

  return FeedConfigSchema.parse(data)
}

export async function loadCategoryConfig(): Promise<CategoryConfig> {
  const filePath = join(CONFIG_DIR, 'categories.yml')
  const content = await readFile(filePath, 'utf-8')
  const data = yaml.load(content)

  return CategoryConfigSchema.parse(data)
}
