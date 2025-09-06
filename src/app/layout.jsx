import {Inter,Geist, Geist_Mono } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
/* 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

export const metadata = {
  title: 'My E-commerce',
  description: 'Modern e-commerce platform',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistSans}>{children}</body>
    </html>
  )
}