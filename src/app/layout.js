import "./globals.css";
import { Inter} from 'next/font/google'
const inter = Inter({ subsets: ["latin"] });
import AuthProvider from '../components/AuthProvider'

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
      
      <body  className={inter.className} >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
