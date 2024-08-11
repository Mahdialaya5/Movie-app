import { Inter } from "next/font/google";
import Head from "next/head";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "edit movie"

};

export default function RootLayout({ children }) {
  return (
    <html lang="en"   >

       <Head>
           <link rel="icon" href="/icon.avif" />
      </Head>
      <body  className={inter.className}  >

    {  children }
      </body>
    </html>
  );
}
