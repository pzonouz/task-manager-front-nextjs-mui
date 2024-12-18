import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { LocalizationProviderWrapper } from "./components/Shared/LocalizationProviderWrapper";
import theme from "./components/Shared/theme";
import ResponsiveAppBar from "./components/Navigation/AppBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Peyman Khalili",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <LocalizationProviderWrapper>
            <ThemeProvider theme={theme}>
              <SessionProvider>
                <ResponsiveAppBar />
                {children}
              </SessionProvider>
            </ThemeProvider>
          </LocalizationProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
