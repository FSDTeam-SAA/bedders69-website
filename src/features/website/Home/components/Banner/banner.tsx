import Image from "next/image";
import {
  BriefcaseBusiness,
  Building2,
  Lock,
  SearchCheck,
  ShoppingBag,
} from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/images/home-hero.png"
        alt="Care Industry"
        width={1920}
        height={1080}
        priority
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/0 from-[9%] via-white/60 via-[43%] to-white/90" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] px-4 pb-16 pt-12 sm:px-6 md:px-8 lg:min-h-[780px] lg:items-center lg:px-12 xl:px-20 2xl:px-24">
        <div className="flex w-full max-w-[760px] flex-col items-start gap-6 lg:gap-8">
          <div className="flex w-full flex-col items-start gap-4">
            <h3 className="text-lg font-bold leading-7 text-green-700 sm:text-xl lg:text-2xl">
              Your Trusted Care Directory
            </h3>

            <h1 className="w-full text-4xl font-bold leading-tight text-cyan-700 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Find. Connect. Care. <br />
              <span className="font-semibold text-slate-800">All in One Place</span>
            </h1>

            <p className="max-w-[700px] text-base leading-7 text-gray-500 sm:text-lg lg:text-2xl">
              The centralised ecosystem for the UK care industry connecting care
              companies, carers, agencies, and families with everything they need.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-[#1e3a5f]/80 px-4 py-5 shadow-[0_24px_48px_rgba(14,35,66,0.18)] outline outline-1 outline-blue-900/40 backdrop-blur-sm sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="grid gap-4 xl:grid-cols-[1fr_1fr_180px] xl:items-end">
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold leading-5 text-white">
                  Search by postcode or name
                </label>
                <input
                  type="text"
                  placeholder="Enter postcode or name"
                  className="h-14 w-full rounded-lg bg-white px-5 text-base text-neutral-700 outline-none placeholder:text-neutral-400"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold leading-5 text-white">
                  I&apos;m looking for
                </label>
                <select className="h-14 w-full appearance-none rounded-lg bg-white px-5 text-base text-neutral-400 outline-none">
                  <option value="">Select what you need</option>
                  <option value="care">Care</option>
                  <option value="agency">Care Agencies</option>
                  <option value="products">Products</option>
                  <option value="jobs">Jobs</option>
                </select>
              </div>

              <button className="h-14 w-full rounded-lg bg-green-700 px-8 text-base font-medium text-white transition hover:bg-green-800">
                Search Now
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-white">
              <Lock className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              <p className="text-sm font-medium leading-5 sm:text-base">
                Carers can only be searched by someone registered
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickLink
              icon={SearchCheck}
              title="Create Profile"
              description={<>Find trusted<br />care companies</>}
              iconBg="bg-cyan-700"
            />
            <QuickLink
              icon={Building2}
              title="Care Agencies"
              description={<>Connect with local<br />care agencies</>}
              iconBg="bg-green-700"
            />
            <QuickLink
              icon={ShoppingBag}
              title="Products"
              description={<>Discover care<br />products</>}
              iconBg="bg-purple-700"
            />
            <QuickLink
              icon={BriefcaseBusiness}
              title="Jobs"
              description={<>Find care jobs<br />near you</>}
              iconBg="bg-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
              <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
              <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
              <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
            </div>
            <p className="text-base font-bold tracking-tight text-cyan-700">Join 10000+</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickLink = ({
  icon: Icon,
  title,
  description,
  iconBg,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: React.ReactNode;
  iconBg: string;
}) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-white p-3 shadow-[4px_4px_7px_0px_rgba(0,0,0,0.15)]">
      <div className={`flex h-14 w-12 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold leading-4 text-neutral-700">{title}</h4>
        <p className="text-xs font-normal leading-4 text-neutral-700">{description}</p>
      </div>
    </div>
  );
};

export default Banner;
