import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="rtl">
      <Head />
      <body className="dark:bg-[#2e2e2e] text-black dark:text-white bg-[#f4f6f8] select-none">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
