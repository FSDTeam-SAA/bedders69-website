import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
        {/* Hero Background Image */}
        <Image
          src="/images/home-hero.png"
          alt="Care Industry"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full min-h-screen"/>

      {/* Background */}
      <div className="absolute inset-0 h-207 bg-linear-to-b from-white/0 from-9% via-white/60 via-43% to-white/90" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex max-auto container items-start my-22">
        <div className="w-250 gap-6 flex flex-col items-start justify-center">
        {/* Heading Content */}
        <div className="flex w-full flex-col items-start gap-4">
          <h3 className="text-xl font-bold leading-7 text-green-700 sm:text-2xl">Your Trusted Care Directory</h3>

          <h1 className="w-full max-w-228 text-4xl font-bold leading-12 text-cyan-700 sm:text-5xl sm:leading-15 lg:text-6xl lg:leading-18">
            Find. Connect. Care. <br />
            <span className="font-medium text-slate-800">All in One Place</span>
          </h1>

          <p className="w-full max-w-228 text-lg font-normal leading-7 text-gray-500 sm:text-xl lg:text-2xl">
            The centralised ecosystem for the UK care industry connecting care companies, carers, agencies, and families with everything they need.
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-260 rounded-xl bg-blue-950/70 px-5 py-6 outline-1 -outline-offset-1 outline-blue-900 sm:px-8 sm:pt-8 sm:pb-4">
          <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-end">
            {/* Search */}
            <div className="flex w-full flex-col gap-4 lg:w-80">
              <label className="text-base font-bold leading-5 text-white">Search by postcode or name</label>
              <input type="text" placeholder="Enter postcode or name" className="h-14 w-full rounded-lg bg-white px-6 py-4 text-base font-normal leading-5 text-neutral-700 outline-none placeholder:text-neutral-400" />
            </div>

            {/* Looking For */}
            <div className="flex w-full flex-col gap-4 lg:w-80">
              <label className="text-base font-bold leading-5 text-white">I’m looking for</label>
              <select className="h-14 w-full appearance-none rounded-lg bg-white px-6 py-4 text-base font-normal leading-5 text-neutral-400 outline-none">
                <option value="">Select what you need</option>
                <option value="care">Care</option>
                <option value="agency">Care Agencies</option>
                <option value="products">Products</option>
                <option value="jobs">Jobs</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="h-14 w-full rounded-lg bg-green-700 px-8 py-4 text-base font-normal leading-5 text-white transition hover:bg-green-800 lg:w-72">Search Now</button>
          </div>

          {/* Registered Notice */}
          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-white">🔒</span>
            <p className="text-sm font-medium leading-5 text-white sm:text-base">Carers can only be searched by someone registered</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink icon="👤" title="Create Profile" description={<>Find trusted<br />care companies</>} iconBg="bg-cyan-700" />
          <QuickLink icon="♟" title="Care Agencies" description={<>Connect with local<br />care agencies</>} iconBg="bg-green-700" />
          <QuickLink icon="▣" title="Products" description={<>Discover care<br />products</>} iconBg="bg-purple-700" />
          <QuickLink icon="💼" title="Jobs" description={<>Find care jobs<br />near you</>} iconBg="bg-amber-500" />
        </div>

        {/* Users */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
            <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
            <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
            <img src="https://placehold.co/40x40" alt="User" className="h-10 w-10 rounded-full border border-white object-cover" />
          </div>

          <div>
            <p className="text-base font-bold tracking-tight text-cyan-700">Join 10000+</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

const QuickLink = ({ icon, title, description, iconBg }: { icon: string; title: string; description: React.ReactNode; iconBg: string }) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-white p-2 shadow-[4px_4px_7px_0px_rgba(0,0,0,0.15)]">
      <div className={`flex h-14 w-12 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <span className="text-xl text-white">{icon}</span>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold leading-4 text-neutral-700">{title}</h4>
        <p className="text-xs font-normal leading-4 text-neutral-700">{description}</p>
      </div>
    </div>
  );
};

export default Banner;