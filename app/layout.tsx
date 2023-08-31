import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/app/components/Navigation";
import { createClient } from "@/prismicio";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Integral Developing",
  description:
    "Welcome to our website, where we empower businesses with cutting-edge web development solutions to create stunning online experiences and drive success in the digital world.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const nav = await client.getSingle("navigation");

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navigation navigation={nav} />
        <main className="flex flex-col items-center mx-auto min-h-screen">
          {children}
        </main>
        <ToastContainer position="bottom-center" theme="colored" />
      </body>
    </html>
  );
}
