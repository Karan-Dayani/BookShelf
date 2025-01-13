import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header";
import SessionWrapper from "./(components)/SessionWrapper";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookShelf",
  description: "My Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className="">
        <body className={`${outfit.className} antialiased`}>
          <Header />
          {children}
          <div id="modal-container"></div>
        </body>
      </html>
    </SessionWrapper>
  );
}
