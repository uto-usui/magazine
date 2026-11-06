/** MOSHI_TOKEN があるときだけ通知する。通知の失敗で生成を失敗扱いにはしない */
export async function notify(title: string, message: string) {
  const token = process.env.MOSHI_TOKEN
  if (!token) return
  try {
    await fetch('https://api.getmoshi.app/api/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, title, message }),
      signal: AbortSignal.timeout(10_000),
    })
  } catch (error) {
    console.error('通知を送れませんでした:', error)
  }
}
