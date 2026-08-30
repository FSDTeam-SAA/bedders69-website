import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/button";
import Navbar from "@/components/shared/navber";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Care Industry",
  description: "Care Industry Platform",
};

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-white antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
