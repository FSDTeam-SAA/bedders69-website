"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 flex justify-between items-center transition-all duration-300 ${
      isScrolled 
        ? "py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]" 
        : "py-5 bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)]"
    }`}>
      {/* Logo */}
      <div className="w-[52px] h-[52px] sm:w-[52px] sm:h-[52px] transition-transform duration-300 hover:scale-105">
        <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Navigation */}
      <div className="hidden lg:flex justify-center items-center gap-10 xl:gap-14">
        <a 
          href="/" 
          className={`${
            pathname === "/" ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Home
        </a>
        <a 
          href="/services" 
          className={`${
            pathname.startsWith("/services") ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Services
        </a>
        <a 
          href="/find-care" 
          className={`${
            pathname.startsWith("/find-care") ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Find Care
        </a>
        <a 
          href="/jobs" 
          className={`${
            pathname.startsWith("/jobs") ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Jobs
        </a>
        <a 
          href="/agencies" 
          className={`${
            pathname.startsWith("/agencies") ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Agencies
        </a>
        <a 
          href="/marketplace" 
          className={`${
            pathname.startsWith("/marketplace") ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Marketplace
        </a>
        <a 
          href="/membership" 
          className={`${
            pathname.startsWith("/membership") ? "text-cyan-700 font-semibold" : "text-gray-500 font-medium"
          } text-base font-['Wix_Madefor_Text'] leading-5 transition-colors duration-200 hover:text-cyan-700`}
        >
          Membership
        </a>
      </div>

      {/* Actions */}
      <div className="flex justify-start items-center gap-2">
        <a
          href="/cart"
          className="relative p-2.5 text-slate-500 hover:text-cyan-700 hover:bg-slate-50 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center mr-2"
        >
          <ShoppingCart className="size-5.5" />
          {totalItemsCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-cyan-700 text-white text-[9px] font-bold size-4.5 rounded-full flex items-center justify-center border border-white">
              {totalItemsCount}
            </span>
          )}
        </a>

        <button className="px-5 py-2.5 rounded-lg flex justify-center items-center gap-2.5 hover:bg-slate-50 transition-colors duration-200 cursor-pointer">
          <span className="text-center text-cyan-700 text-base font-semibold font-['Wix_Madefor_Text'] leading-5">Sign In</span>
        </button>

        <button className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 rounded-lg flex justify-center items-center gap-2.5 shadow-sm hover:shadow transition-all duration-200 cursor-pointer">
          <span className="text-center text-neutral-100 text-base font-semibold font-['Wix_Madefor_Text'] leading-5">Join Free</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;