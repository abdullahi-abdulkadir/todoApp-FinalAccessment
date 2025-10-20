import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head className="display-none">
        {/* Remove favicon */}
   
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
