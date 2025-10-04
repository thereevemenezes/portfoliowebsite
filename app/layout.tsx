import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      {/* keep comments OUTSIDE the html/body boundary to avoid whitespace nodes */}
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
