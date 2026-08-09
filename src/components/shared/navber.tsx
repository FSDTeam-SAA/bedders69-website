"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/services", label: "Services", active: pathname.startsWith("/services") },
    { href: "/find-care", label: "Find Care", active: pathname.startsWith("/find-care") },
    { href: "/jobs", label: "Jobs", active: pathname.startsWith("/jobs") },
    { href: "/agencies", label: "Agencies", active: pathname.startsWith("/agencies") },
    { href: "/marketplace", label: "Marketplace", active: pathname.startsWith("/marketplace") },
    { href: "/membership", label: "Membership", active: pathname.startsWith("/membership") },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-100 bg-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md"
          : "bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
        <div className="h-[52px] w-[52px] shrink-0 transition-transform duration-300 hover:scale-105">
          <img src="/images/logo.png" alt="Logo" className="h-full w-full object-contain" />
        </div>

        <div className="hidden items-center gap-8 lg:flex xl:gap-12">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-base leading-5 transition-colors duration-200 hover:text-cyan-700 ${
                item.active ? "font-semibold text-cyan-700" : "font-medium text-gray-500"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="/cart"
            className="relative mr-1 flex items-center justify-center rounded-full p-2.5 text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-cyan-700"
          >
            <ShoppingCart className="size-5.5" />
            {totalItemsCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex size-4.5 items-center justify-center rounded-full border border-white bg-cyan-700 text-[9px] font-bold text-white">
                {totalItemsCount}
              </span>
            )}
          </a>

          <button className="hidden rounded-lg px-4 py-2.5 transition-colors duration-200 hover:bg-slate-50 md:flex">
            <span className="text-base font-semibold leading-5 text-cyan-700">Sign In</span>
          </button>

          <button className="rounded-lg bg-cyan-700 px-4 py-2.5 shadow-sm transition-all duration-200 hover:bg-cyan-800 hover:shadow md:px-6">
            <span className="text-base font-semibold leading-5 text-neutral-100">Join Free</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-[0_12px_24px_-12px_rgba(15,23,42,0.18)] lg:hidden sm:px-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-base transition-colors ${
                  item.active ? "bg-cyan-700/10 font-semibold text-cyan-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:hidden">
            <a
              href="/cart"
              className="rounded-lg border border-slate-200 px-4 py-3 text-base font-medium text-slate-700"
            >
              Cart {totalItemsCount > 0 ? `(${totalItemsCount})` : ""}
            </a>
            <button className="rounded-lg border border-cyan-700 px-4 py-3 text-base font-semibold text-cyan-700">
              Sign In
            </button>
            <button className="rounded-lg bg-cyan-700 px-4 py-3 text-base font-semibold text-white">
              Join Free
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
