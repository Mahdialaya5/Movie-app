import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "edit movie"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"   >

      <div className={inter.className}  >
        {children}
      </div>
    </html>
  );
}
