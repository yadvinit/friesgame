import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nupur's High-Vibe Chill & Grind Challenge 🍸🌀",
  description: "Can you pass Nupur's workaholic & chill trivia, survive the drinks wheel, and promise Vinit coffee?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
