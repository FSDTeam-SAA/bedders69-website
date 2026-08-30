import Link from "next/link";
import {
  Building2,
  Briefcase,
  Users2,
  ShoppingBag,
  GraduationCap,
  ShieldCheck,
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
  {
    title: "Training",
    href: "/training",
    icon: GraduationCap,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    title: "Compliance",
    href: "/services",
    icon: ShieldCheck,
    iconBg: "bg-blue-500/10",
    iconColor: "text-cyan-700",
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

        {/* Services Cards */}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {services.map((service) => {
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
