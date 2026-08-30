"use client";

import { MapPin, MessageCircle, Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface CareCompanyCardProps {
  id?: string;
  name: string;
  location: string;
  rating: string;
  reviews: string;
  tags: string[];
  image?: string;
  email?: string;
  phoneNumber?: string;
  websiteLink?: string;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800";

const Card = ({
  id,
  name,
  location,
  rating = "4.9",
  reviews = "18",
  tags = [],
  image = DEFAULT_IMAGE,
  email,
  phoneNumber,
  websiteLink,
}: CareCompanyCardProps) => {
  const [imgSrc, setImgSrc] = useState<string>(image || DEFAULT_IMAGE);

  useEffect(() => {
    if (image) {
      setImgSrc(image);
    }
  }, [image]);

  const displayTags = tags && tags.length > 0 ? tags.slice(0, 2) : ["Care Provider"];
  const remainingCount = tags && tags.length > 2 ? tags.length - 2 : null;

  // Generate URL-friendly slug for service details page
  const slug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
  const detailsUrl = `/services/${slug}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_4px_6px_0px_rgba(43,110,166,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_24px_0px_rgba(43,110,166,0.18)]">
      {/* Clickable Image Section */}
      <Link href={detailsUrl} className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-slate-100 block cursor-pointer">
        <Image
          src={imgSrc}
          alt={name}
          width={400}
          height={200}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />
        <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-cyan-700 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Clickable Title */}
          <Link href={detailsUrl} className="block cursor-pointer">
            <h3 className="text-lg font-bold leading-6 text-cyan-700 transition-colors line-clamp-1 hover:text-cyan-800">
              {name}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <MapPin className="size-4 shrink-0" />
              <span className="text-sm font-normal leading-4 line-clamp-1">
                {location || "United Kingdom"}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold leading-5 text-cyan-700">{rating}</span>
                <span className="text-xs font-normal leading-4 text-gray-500">({reviews})</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {displayTags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold leading-4 text-cyan-700"
              >
                {tag}
              </span>
            ))}

            {remainingCount && (
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold leading-4 text-zinc-800">
                +{remainingCount}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={detailsUrl}
            className="flex h-11 w-full items-center justify-center rounded-lg border border-cyan-700 bg-cyan-50/50 px-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100/70"
          >
            View Details
          </Link>

          <a
            href={websiteLink || (email ? `mailto:${email}` : (phoneNumber ? `tel:${phoneNumber}` : "#"))}
            target={websiteLink ? "_blank" : undefined}
            rel={websiteLink ? "noopener noreferrer" : undefined}
            className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-700 px-3 text-sm font-semibold text-white shadow transition hover:bg-cyan-800"
          >
            <MessageCircle className="size-4" />
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;