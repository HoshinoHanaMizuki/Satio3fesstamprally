import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "三納三財都於郡３地区合同スタンプラリー",
  description: "３地区合同スタンプラリー公式サイトです！三財へそ祭り・都於郡城址祭り・三納ちびっ子相撲大会を巡ってスタンプを集めて、豪華景品が当たる抽選に応募しよう！",
  keywords:["三納","三財","都於郡","へそ祭り","城址祭り","ちびっ子相撲大会","3地区合同スタンプラリー"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
        <link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
