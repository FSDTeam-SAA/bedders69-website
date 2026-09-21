import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Briefcase,
  Users2,
  ShoppingBag,
} from "lucide-react";

const services = [
  {
    title: "Care Providers",
    href: "/services",
    icon: Building2,
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-700",
  },
  {
    title: "Care Jobs",
    href: "/jobs",
    icon: Briefcase,
    iconBg: "bg-yellow-500/10",
    iconColor: "text-amber-600",
  },
  {
    title: "Recruitment",
    href: "/agencies",
    icon: Users2,
    iconBg: "bg-purple-700/10",
    iconColor: "text-purple-600",
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
    iconBg: "bg-red-500/10",
    iconColor: "text-rose-600",
  },
];

const OurServices = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        {/* Section Heading */}
        <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">
            our services
          </span>

          <h2 className="text-3xl font-bold leading-10 text-indigo-900 sm:text-4xl">
            Everything the Care Sector <span className="text-green-700">Needs</span>
          </h2>

          <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
            From finding care to recruiting staff one platform for the entire UK care ecosystem
          </p>
        </div>

        {/* Services Cards and Training Feature */}
        <div className="grid w-full max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 xl:gap-5">
          {services.slice(0, 2).map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 shadow-[2px_4px_9px_0px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] border border-slate-100/80 hover:border-cyan-200"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${service.iconBg}`}
                >
                  <Icon className={`size-7 ${service.iconColor}`} />
                </div>

                <h3 className="text-center text-base font-semibold leading-6 text-indigo-900 transition-colors group-hover:text-cyan-700 sm:text-lg">
                  {service.title}
                </h3>
              </Link>
            );
          })}

          <Link
            href="/"
            className="group col-span-2 flex min-h-40 items-center justify-center gap-5 rounded-xl bg-white px-5 py-4 shadow-[2px_4px_9px_0px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] border border-slate-100/80 hover:border-emerald-200 md:order-none"
          >
            <div className="flex size-24 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:size-28">
              <Image
                src="/images/logo.png"
                alt="The Care Directory"
                width={112}
                height={112}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold italic leading-tight text-indigo-900 sm:text-3xl">Training</h3>
              <p className="mt-1 text-sm font-semibold italic leading-6 text-slate-600 sm:text-base">
                Meet Compliance<br />
                Update your training<br />
                or enhance your skills
              </p>
            </div>
          </Link>

          {services.slice(2).map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 shadow-[2px_4px_9px_0px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] border border-slate-100/80 hover:border-cyan-200"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${service.iconBg}`}
                >
                  <Icon className={`size-7 ${service.iconColor}`} />
                </div>

                <h3 className="text-center text-base font-semibold leading-6 text-indigo-900 transition-colors group-hover:text-cyan-700 sm:text-lg">
                  {service.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
