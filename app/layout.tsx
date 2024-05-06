import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "그냥, 여우",
  description: "우당탕탕 여우의 신혼 일상툰",
  keywords: ["여우", "그냥", "신혼 일상", "인스타툰", "일상툰"],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {props.children}
        {props.modal}
        <div id="modal-root" />
      </body>
      <GoogleAnalytics gaId="G-WF4EN5RSE1" />
    </html>
  );
}
