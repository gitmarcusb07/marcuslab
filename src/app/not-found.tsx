"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import BackToTop from "@/components/layout/BackToTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { copyToClipboard } from "@/lib/utils";

export default function NotFound() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard("email.marcus07@gmail.com");
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative isolation bg-navy">
      <ScrollProgress />
      <Navbar />
      <main className="relative z-0 flex-1 px-6 pb-20 pt-32 sm:pt-36">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-orange/30 bg-orange/5 mb-6">
            <Image
              src="/images/logo.png"
              alt="MarcusLab logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg border border-white/20 bg-white/10"
            />
          </div>
          <h1 className="text-gradient-warm display mb-4 text-[clamp(4.25rem,12vw,7.5rem)]">
            404
          </h1>
          <p className="text-lg text-muted/80 mb-8 leading-7">
            This quadrant of the digital universe isn&apos;t mapped yet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="button-primary flex items-center justify-center"
            >
              Return to Home
            </Link>
            <button
              onClick={handleCopy}
              className="button-secondary flex items-center justify-center"
            >
              {copied ? "Copied!" : "email.marcus07@gmail.com"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
      <CustomCursor />
    </div>
  );
}
