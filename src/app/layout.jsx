import MainNavigation from "./components/MainNavigation";
import "./globals.css";
import { Onest } from "next/font/google";

export const metadata = {
  title: "AC FGGR",
  description: "AC Factory FGGR Dashboard",
};

const onest = Onest({ subsets: ["latin"], display: "swap" });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={onest.className} suppressHydrationWarning={true}>
      <body className="flex flex-col dark:bg-opacity-0 min-h-[100dvh]">
        <header>
          <MainNavigation />
        </header>
        <main className="flex-grow overflow-y-auto container-sm mx-0">
          {children}
        </main>
      </body>
    </html>
  );
}
