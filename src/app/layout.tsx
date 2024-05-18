import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Sofia_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dafazan Repo",
  description: "Dafazan's Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-screen h-screen fixed">
          <div className="w-56 sticky">
            <Sidebar />
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
