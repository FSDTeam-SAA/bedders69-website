"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";

export interface BannerData {
  _id: string;
  title?: string;
  image: string;
  description?: string;
  link?: string;
  isActive?: boolean;
}

export default function AdBannersSlider() {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Touch & drag states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_API_URL ;
        const res = await fetch(`${backendUrl}/banners`);
        if (!res.ok) throw new Error("Failed to fetch banners");
        const json = await res.json();
        const activeBanners = (json.data || []).filter(
          (b: BannerData) => b.isActive !== false
        );
        setBanners(activeBanners);
      } catch (err) {
        console.error("Error loading ad banners:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  // Autoplay timer
  useEffect(() => {
    if (banners.length <= 1 || isHovered || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length, isHovered, isDragging, nextSlide]);

  // Pointer & Drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
      setCurrentIndex((prev) =>
        (prev - 1 + banners.length) % banners.length,
      );
    }
    setDragOffset(0);
  };

  if (isLoading) {
    return null;
  }

  if (banners.length === 0) {
    return (
      <section className="w-full border-y border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
          <div className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center">
            <Sparkles className="size-7 text-cyan-700" />
            <h2 className="mt-3 text-base font-semibold text-slate-800">No banner data found</h2>
            <p className="mt-1 text-sm text-slate-500">There are no active banners to display right now.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-4 sm:py-6 lg:py-8">
      <div className="relative mx-auto w-full max-w-[1600px] px-0 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
        {/* Banner image slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handlePointerUp();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full overflow-hidden select-none touch-pan-y cursor-default md:cursor-grab md:active:cursor-grabbing"
        >

          {/* Sliding Track Container */}
          <div
            className="flex w-full transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {banners.map((banner) => (
              <div
                key={banner._id}
                onClick={() => {
                  if (Math.abs(dragOffset) > 10) return;
                  if (banner.link) {
                    window.open(banner.link, "_blank", "noopener,noreferrer");
                  }
                }}
                className="min-w-0 w-full shrink-0 cursor-pointer"
              >
                {/* Original API image: intentionally displayed without visual layers. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image}
                  alt={banner.title || "Banner"}
                  className="block h-auto w-full max-w-full"
                />

              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
