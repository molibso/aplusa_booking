// layout.tsx
"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Roboto, Montserrat } from "next/font/google";
import "../globals.css";
import Head from "./head";  

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],   
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],   
});

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />  
      <body className={`dark:bg-black ${roboto.className} ${montserrat.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
