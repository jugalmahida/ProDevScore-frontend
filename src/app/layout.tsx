import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Fira_Sans } from "next/font/google";

import "./globals.css";

const fira = Fira_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro DevScore",
  description:
    "AI Powered Employee's performance finder based on code review by commits in github repo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${fira.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
