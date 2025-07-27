import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSessionProvider from "./ClientSessionProvider";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A simple Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <Navbar />
          <main className="pt-0">{children}</main>
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}