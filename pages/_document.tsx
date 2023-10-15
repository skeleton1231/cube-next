// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* 你可以在这里添加网站图标、SEO元标签、CSS文件等 */}
        </Head>
        <body className="font-inter antialiased bg-slate-900 text-slate-200 tracking-tight">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
