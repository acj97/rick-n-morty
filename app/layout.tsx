import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import Navbar from "@/components/navbar";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 👇 Prevent flash & default to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');

                  // Default to dark mode if no saved value
                  if (!saved || saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${orbitron.className} antialiased bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <Navbar />
        <div className="mt-30">
          {children}
        </div>
      </body>
    </html>
  );
}
