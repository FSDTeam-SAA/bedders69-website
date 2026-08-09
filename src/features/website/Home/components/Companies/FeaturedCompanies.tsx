import CareCompanyCard from "@/components/shared/careCard";
import type { CareCompanyCardProps } from "@/components/shared/careCard";
import { companies } from "@/Data/data";

const FeaturedCompanies = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">Verified Services</span>

          <h2 className="text-3xl font-bold leading-10 text-indigo-900 sm:text-4xl">Featured Care Companies</h2>

          <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">From finding care to recruiting staff one platform for the entire UK care ecosystem</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company: CareCompanyCardProps) => (
            <CareCompanyCard key={company.name} {...company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
