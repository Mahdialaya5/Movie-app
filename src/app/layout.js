import "./globals.css";
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['cyrillic'],
})

export const metadata = {
  title: "movieApp",
  description: "movieApp",
  icons: {
    icon: "/icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body  className={roboto.className} >
    {children}
      </body>
    </html>
  );
}
