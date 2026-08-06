import { Star } from "lucide-react";
import Image from "next/image";

const OurCommitment = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
<div className="container mx-auto w-full ">
        <div className=" flex w-full flex-2 items-center gap-10 lg:flex-row">
        {/* Content */}
        <div className="flex w-full max-w-175 flex-col items-start gap-2 lg:flex-1">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">
            Our Commitment
          </span>

          <h2 className="text-3xl font-bold leading-10 text-cyan-700 sm:text-4xl">
            Your Well-Being
            Is <span className="text-green-700">Our Priority</span>
          </h2>

          <div className="mt-6 flex w-full flex-col items-start gap-8">
            <p className="max-w-xl text-sm font-normal leading-6 text-neutral-700 sm:text-base">
              Our care plans are designed around the unique needs and preferences of each individual, so they can live comfortably and confidently at home or in the right residential setting.
            </p>

            {/* Care Services */}
            <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-2 rounded-xl bg-emerald-50 p-4 text-center shadow-[2px_6px_4px_0px_rgba(0,0,0,0.10)]">
                <h3 className="text-base font-semibold leading-5 text-green-700">
                  Companion Care
                </h3>
                <p className="text-sm leading-5 text-green-700">
                  Emotional support and daily assistance
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-purple-50 p-4 text-center shadow-[2px_6px_4px_0px_rgba(0,0,0,0.10)]">
                <h3 className="text-base font-semibold leading-5 text-purple-900">
                  Dementia Care
                </h3>
                <p className="text-sm leading-5 text-purple-900">
                  Specialist memory support services
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-blue-50 p-4 text-center shadow-[2px_6px_4px_0px_rgba(0,0,0,0.10)]">
                <h3 className="text-base font-semibold leading-5 text-cyan-700">
                  Personal Care
                </h3>
                <p className="text-sm leading-5 text-cyan-700">
                  Hands-on help with daily living
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-amber-50 p-4 text-center shadow-[2px_6px_4px_0px_rgba(0,0,0,0.10)]">
                <h3 className="text-base font-semibold leading-5 text-amber-500">
                  Respite Care
                </h3>
                <p className="text-sm leading-5 text-amber-500">
                  Temporary relief for family carers
                </p>
              </div>
            </div>

            {/* CTA */}
            <button className="rounded-xl bg-cyan-700 px-6 py-4 text-sm font-medium leading-5 text-white transition hover:bg-cyan-800 sm:text-base">
              Find Care Services Near You
            </button>
          </div>
        </div>

        {/* Images + Rating */}
<div className="flex w-full items-start gap-4 lg:flex-1">
  <div className="w-1/2">
    <Image
      src="/images/commitment-main.jpg"
      alt="Care services"
      width={446}
      height={478}
      className="h-90 w-full rounded-xl object-cover sm:h-105 lg:h-119.5"
    />
  </div>

  <div className="flex w-1/2 flex-col gap-4">
    <Image
      src="/images/commitment-small.jpg"
      alt="Care support"
      width={311}
      height={224}
      className="h-44 w-full rounded-xl object-cover sm:h-52 lg:h-56"
    />

    <div className="flex flex-col items-start rounded-xl border border-black/5 bg-white p-5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="size-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>

      <div className="pt-2">
        <div className="text-2xl font-extrabold leading-8 text-gray-900">98%</div>
      </div>

      <span className="text-sm font-normal leading-5 text-gray-400">
        Client satisfaction
      </span>
    </div>
  </div>
</div>
      </div>
</div>
    </section>
  );
};

export default OurCommitment;