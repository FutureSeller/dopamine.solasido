import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { QueryProvider } from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "그냥, 여우",
  description: "우당탕탕 여우의 신혼 일상툰",
  keywords: ["여우", "그냥", "신혼", "일상", "인스타툰", "일상툰", "여우툰"],
  verification: {
    other: {
      "naver-site-verification": "824e2b95f2f41885691ac159d870317ee120dc1d",
    },
  },
  openGraph: {
    url: "https://dopamine.solasido.design",
    title: "그냥, 여우!",
    description: "우당탕탕 여우의 신혼 일상툰",
    type: "article",
    images: [
      {
        url: "https://dopamine.solasido.design/opengraph-image.jpeg",
        alt: "그냥, 여우!",
      },
    ],
  },
  twitter: {
    title: "그냥, 여우!",
    description: "우당탕탕 여우의 신혼 일상툰",
    card: "summary_large_image",
    images: [
      {
        url: "https://dopamine.solasido.design/twitter-image.jpeg",
        alt: "그냥, 여우!",
      },
    ],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <html lang="ko">
        <body className={[inter.className, "pb-safe"].join(" ")}>
          <main className="flex min-h-screen flex-col items-center justify-between py-4 sm:py-8 bg-black text-white">
            {props.children}
          </main>
          <div id="modal-root" />
        </body>
        <GoogleAnalytics gaId="G-WF4EN5RSE1" />
      </html>
    </QueryProvider>
  );
}
