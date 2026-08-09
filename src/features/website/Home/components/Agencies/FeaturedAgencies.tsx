import CareCompanyCard, { CareCompanyCardProps } from "@/components/shared/careCard";

const agencies: CareCompanyCardProps[] = [
  {
    name: "Sunrise Care Group",
    location: "Manchester, Greater Manchester",
    rating: "4.8",
    reviews: "142 reviews",
    tags: ["Residential", "Dementia Care"],
  },
  {
    name: "Helping Hands Care",
    location: "London, Greater London",
    rating: "4.9",
    reviews: "186 reviews",
    tags: ["Home Care", "Elderly Care"],
  },
  {
    name: "Care Support UK",
    location: "Birmingham, West Midlands",
    rating: "4.7",
    reviews: "98 reviews",
    tags: ["Nursing", "Personal Care"],
  },
  {
    name: "Comfort Care Services",
    location: "Liverpool, Merseyside",
    rating: "4.8",
    reviews: "121 reviews",
    tags: ["Residential", "Supported Living"],
  },
  {
    name: "Trusted Care Ltd",
    location: "Leeds, West Yorkshire",
    rating: "4.9",
    reviews: "164 reviews",
    tags: ["Dementia Care", "Home Care"],
  },
  {
    name: "Bluebell Care Group",
    location: "Bristol, Bristol",
    rating: "4.6",
    reviews: "87 reviews",
    tags: ["Nursing Care", "Residential"],
  },
];

const FeaturedAgencies = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        {/* Heading */}
        <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">Verified Services</span>

          <h2 className="text-3xl font-bold leading-10 text-indigo-900 sm:text-4xl">Featured care Agencies</h2>

          <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">From finding care to recruiting staff — one platform for the entire UK care ecosystem</p>
        </div>

        {/* Agencies */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agencies.map((agency) => (
            <CareCompanyCard key={agency.name} {...agency} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgencies;
