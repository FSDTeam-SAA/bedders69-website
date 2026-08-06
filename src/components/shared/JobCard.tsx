import { Clock3, MapPin } from "lucide-react";

export interface CareJobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  posted: string;
  featured?: boolean;
}

const JobCard = ({ title, company, location, type, tags, posted, featured = false }: CareJobCardProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-[2px_4px_8px_0px_rgba(0,0,0,0.12)]">
      {/* Header */}
      <div className="flex w-full items-start gap-2.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-cyan-700 to-green-700">
          <span className="text-lg font-bold text-white">C</span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold leading-5 tracking-tight text-indigo-900 sm:text-lg">{title}</h3>
          <p className="mt-1 text-sm font-normal leading-4 tracking-tight text-gray-500">{company}</p>
        </div>

        {featured && (
          <span className="shrink-0 rounded-lg bg-sky-100 px-3 py-1 text-xs font-medium leading-4 text-cyan-700 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12)]">Featured</span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-black/10 pb-4">
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <MapPin className="size-4" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <Clock3 className="size-3.5" />
          <span>{type}</span>
        </div>
      </div>

      {/* Tags + Posted */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium leading-4 text-neutral-500 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12)]">{tag}</span>
          ))}
        </div>

        <span className="shrink-0 text-xs font-normal leading-4 text-zinc-400">{posted}</span>
      </div>
    </div>
  );
};

export default JobCard;