export function getDefaultStyles(): string {
  return `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.8;
      color: #333333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 680px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    .header {
      border-bottom: 2px solid #333333;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 0;
    }
    h1 {
      font-size: 22px;
      line-height: 1.4;
      margin-top: 32px;
      margin-bottom: 16px;
      color: #111111;
    }
    h2 {
      font-size: 18px;
      line-height: 1.4;
      margin-top: 28px;
      margin-bottom: 12px;
      color: #222222;
    }
    h3 {
      font-size: 16px;
      line-height: 1.4;
      margin-top: 24px;
      margin-bottom: 8px;
      color: #333333;
    }
    p {
      margin: 0 0 16px 0;
      font-size: 15px;
    }
    a {
      color: #0066cc;
      text-decoration: underline;
    }
    a:hover {
      color: #004499;
    }
    ul, ol {
      margin: 0 0 16px 0;
      padding-left: 24px;
    }
    li {
      margin-bottom: 8px;
    }
    blockquote {
      margin: 16px 0;
      padding: 12px 20px;
      border-left: 4px solid #dddddd;
      background-color: #f9f9f9;
      font-style: italic;
      color: #555555;
    }
    blockquote p {
      margin: 0;
    }
    hr {
      border: none;
      border-top: 1px solid #dddddd;
      margin: 32px 0;
    }
    .footer {
      border-top: 1px solid #dddddd;
      padding-top: 16px;
      margin-top: 32px;
      font-size: 13px;
      color: #666666;
      text-align: center;
    }
  `
}

export function wrapWithTemplate(content: string): string {
  const styles = getDefaultStyles()

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UXエンジニアリング ニュースレター</title>
  <style>
${styles}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>UXエンジニアリング ニュースレター</h1>
    </div>
    <div class="content">
${content}
    </div>
  </div>
</body>
</html>`
}
