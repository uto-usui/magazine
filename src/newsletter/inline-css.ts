import juice from 'juice'

export async function inlineCss(html: string): Promise<string> {
  return juice(html)
}
