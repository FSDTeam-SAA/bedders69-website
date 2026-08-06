const services = [
  { title: "Care Providers", icon: "♧", iconBg: "bg-sky-300/20", iconColor: "text-sky-700" },
  { title: "Care Jobs", icon: "⌁", iconBg: "bg-yellow-500/10", iconColor: "text-amber-500" },
  { title: "Recruitment", icon: "♙", iconBg: "bg-purple-700/10", iconColor: "text-purple-500" },
  { title: "Marketplace", icon: "▤", iconBg: "bg-red-500/10", iconColor: "text-red-500" },
  { title: "Training", icon: "♙", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500" },
  { title: "Compliance", icon: "▯", iconBg: "bg-red-500/10", iconColor: "text-rose-600" },
];

const OurServices = () => {
  return (
    <section className="w-full bg-white py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-384 max-w-full flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        {/* Section Heading */}
        <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">our services</span>

          <h2 className="text-3xl font-bold leading-10 text-indigo-900 sm:text-4xl">
            Everything the Care Sector <span className="text-green-700">Needs</span>
          </h2>

          <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
            From finding care to recruiting staff one platform
            for the entire UK care ecosystem
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid container grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map((service) => (
            <div key={service.title} className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-[2px_4px_9px_0px_rgba(0,0,0,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[2px_6px_14px_0px_rgba(0,0,0,0.12)]">
              <div className={`flex size-12 items-center justify-center rounded-lg ${service.iconBg}`}>
                <span className={`text-2xl ${service.iconColor}`}>{service.icon}</span>
              </div>

              <h3 className="text-center text-lg font-semibold leading-8 text-indigo-900 sm:text-xl">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;