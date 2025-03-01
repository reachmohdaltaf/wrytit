"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Agar dashboard route hai to Navbar aur Footer hide karna */}
        {pathname.startsWith("/dashboard") ? (
          <main className="flex-grow">
            {" "}
            <NextTopLoader
  color="#000"
  initialPosition={0.08}
  crawlSpeed={300}
  height={4}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  zIndex={1600}
  showAtBottom={false}
/>
            {children}
          </main>
        ) : (
          <>
            <header className="fixed top-0 z-10 w-full">
              <Navbar />
            </header>
            <main className="flex-grow md:mt-10 flex items-center justify-center bg-background text-foreground">
            <NextTopLoader
  color="#000"
  initialPosition={0.08}
  crawlSpeed={300}
  height={4}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  zIndex={1600}
  showAtBottom={false}
/>

              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
