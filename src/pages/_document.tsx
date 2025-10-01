import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Remove favicon */}
        <link rel="icon" href="data:," />
         <link rel="icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAA" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
