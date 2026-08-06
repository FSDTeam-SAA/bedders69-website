import { MapPin, MessageCircle, Star } from "lucide-react";
import Image from "next/image";

export interface CareCompanyCardProps {
  name: string;
  location: string;
  rating: string;
  reviews: string;
  tags: string[];
  image?: string;
}

const Card = ({ name, location, rating, reviews, tags, image = "/images/care-company.jpg" }: CareCompanyCardProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_4px_6px_0px_rgba(43,110,166,0.10)]">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        <Image src={image} alt={name} width={400} height={200} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold leading-5 text-cyan-700">{name}</h3>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <MapPin className="size-4 text-zinc-500" />
              <span className="text-sm font-normal leading-4 text-zinc-500">{location}</span>
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
          <div className="flex flex-wrap items-center gap-1">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold leading-4 text-cyan-700">{tag}</span>
            ))}

            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold leading-4 text-zinc-800">+1</span>
          </div>
        </div>

        {/* Contact */}
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-cyan-700 px-4 text-base font-semibold leading-5 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition hover:bg-cyan-800">
          <MessageCircle className="size-5" />
          Contact
        </button>
      </div>
    </div>
  );
};

export default Card;