import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";
import AuthProvider from "@src/contexts/AuthContext";
// import AuthProvider, { useAuth } from "@src/contexts/AuthContext";
// import Footer from "@src/components/footer";
// import ScreenMessage from "@src/components/screen-message";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "M'Dev Cloud",
  description: "Aplicação de armazenamento em nuvem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="pt-br" className="min-h-full w-full my-bg h-auto">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased my-bg h-full w-full`}
      >
        {/* <AuthProvider>
          {screenMsg && <ScreenMessage type={screenMsg.type} message={screenMsg.message} />}
          {children}
        </AuthProvider>
        <Footer /> */}
        <AuthProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
