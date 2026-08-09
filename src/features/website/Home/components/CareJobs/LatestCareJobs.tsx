import { ArrowUpRight } from "lucide-react";
import CareJobCard, { CareJobCardProps } from "@/components/shared/JobCard";

const jobs: CareJobCardProps[] = [
  {
    title: "Registered Nurse (RGN)",
    company: "HC-One Care",
    location: "Austin, TX",
    type: "Full-Time",
    tags: ["NMC Registration", "Nursing"],
    posted: "3 days ago",
    featured: true,
  },
  {
    title: "Senior Care Worker",
    company: "Sunrise Senior Living",
    location: "Austin, TX",
    type: "Full-Time",
    tags: ["NVQ Level 3", "Leadership"],
    posted: "3 days ago",
    featured: true,
  },
  {
    title: "Care Home Manager",
    company: "HC-One Care",
    location: "Austin, TX",
    type: "Full-Time",
    tags: ["Management", "CQC"],
    posted: "3 days ago",
  },
  {
    title: "Support Worker",
    company: "Anchor Hanover",
    location: "Austin, TX",
    type: "Full-Time",
    tags: ["Support Work", "Learning Disabilities"],
    posted: "3 days ago",
  },
];

const LatestCareJobs = () => {
  return (
    <section className="w-full bg-[#f4f9ff] px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 sm:gap-12 lg:gap-14">
        {/* Heading */}
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">Latest Roles</span>

          <h2 className="text-3xl font-bold leading-10 text-cyan-700 sm:text-4xl">
            Care <span className="text-green-700">Jobs</span> Vacancies Across the UK
          </h2>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">Rewarding roles updated daily</p>

            <button className="flex items-center gap-2 text-base font-bold tracking-tight text-cyan-700 sm:text-lg">
              Browse All Jobs
              <ArrowUpRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Jobs */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <CareJobCard key={`${job.title}-${job.company}`} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCareJobs;
