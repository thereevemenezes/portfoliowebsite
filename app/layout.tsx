// app/layout.tsx
import "./globals.css"; // <-- IMPORTANT: brings Tailwind into the app

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">  {/* start in dark mode */}
      <body
        suppressHydrationWarning
        className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200"
      >
        {children}
      </body>
    </html>
  );
}

