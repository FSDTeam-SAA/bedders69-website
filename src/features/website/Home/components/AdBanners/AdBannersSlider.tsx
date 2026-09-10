"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";

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

  const prevSlide = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
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
      prevSlide();
    }
    setDragOffset(0);
  };

  if (isLoading || banners.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-8 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-100">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
        {/* Section Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-[11px] font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Featured Advertisements & Offers
            </span>
          </div>

          {banners.length > 1 && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-cyan-700 font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(banners.length).padStart(2, "0")}</span>
            </div>
          )}
        </div>

        {/* Outer Frame with Glowing Shadow */}
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
          className="relative group w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-950 shadow-[0_12px_36px_rgba(14,35,66,0.12)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(14,35,66,0.22)] select-none cursor-grab active:cursor-grabbing"
        >
          {/* Animated Autoplay Progress Bar */}
          {banners.length > 1 && (
            <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/10 backdrop-blur-xs">
              <div
                key={currentIndex}
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-100 ease-linear"
                style={{
                  width: isHovered ? "100%" : "100%",
                  animationName: isHovered ? "none" : "progressAnimation",
                  animationDuration: "5000ms",
                  animationTimingFunction: "linear",
                  animationFillMode: "forwards",
                }}
              />
            </div>
          )}

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
                className="relative min-w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] shrink-0 overflow-hidden group/slide cursor-pointer"
              >
                {/* Background Image with Subtle Hover Zoom */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image}
                  alt={banner.title || "Banner"}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/slide:scale-105"
                />

                {/* Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 via-[50%] to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

                {/* Overlay Text Content */}
                {(banner.title || banner.description || banner.link) && (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-12 text-white pointer-events-none">
                    <div className="max-w-2xl transform transition-all duration-500 translate-y-0 opacity-100">
                      {banner.title && (
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-md">
                          {banner.title}
                        </h3>
                      )}
                      {banner.description && (
                        <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 max-w-xl font-normal leading-relaxed drop-shadow-xs">
                          {banner.description}
                        </p>
                      )}
                      {banner.link && (
                        <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-slate-950 text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/30 shadow-lg transition-all duration-300 pointer-events-auto transform group-hover/slide:translate-x-1">
                          <span>Explore Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Glassmorphism Navigation Controls */}
          {banners.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-950 border border-white/30 backdrop-blur-md shadow-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 z-20 cursor-pointer"
                aria-label="Previous Banner"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-950 border border-white/30 backdrop-blur-md shadow-xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 z-20 cursor-pointer"
                aria-label="Next Banner"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicator Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-7 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-sm"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to banner ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar Animation Styles */}
      <style jsx>{`
        @keyframes progressAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
