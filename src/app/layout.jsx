import MainNavigation from "./components/MainNavigation";
import MyThemeProvider from "./components/MyThemeProvider";
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
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `,
          }}
        /> */}
      </head>
      <body className="flex flex-col bg-slate-200 dark:bg-opacity-0 min-h-[100dvh]">
        <MyThemeProvider attribute="class">
          <MainNavigation />
          <main className="flex-grow overflow-y-auto container-sm mx-0">
            {children}
          </main>
        </MyThemeProvider>
      </body>
    </html>
  );
}
