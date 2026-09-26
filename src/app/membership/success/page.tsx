"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function MembershipSuccessPage() {
  const router = useRouter();
  useEffect(() => { const timer = window.setTimeout(() => router.replace("/dashboard"), 1200); return () => window.clearTimeout(timer); }, [router]);
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center"><div><h1 className="text-2xl font-bold text-slate-800">Payment successful</h1><p className="mt-2 text-slate-600">Your membership is being activated. Redirecting to your dashboard...</p></div></main>;
}
