import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/Data/data";
import { FiArrowUpRight } from "react-icons/fi";

const CareMarketplace = () => {
  return (
    <section className="w-full bg-[#eef6ff] px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-10 sm:gap-12 lg:gap-14">
        {/* Heading */}
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">
            Care Marketplace
          </span>

          <h2 className="text-3xl font-bold leading-10 text-cyan-700 sm:text-4xl">
            Essential Care <span className="text-green-700">Products</span>
          </h2>

          <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center">
            <p className="flex-1 text-base font-normal leading-6 text-neutral-700">
              Software, equipment, training and supplies
            </p>

            <button className="flex items-center gap-2 text-lg font-bold leading-5 tracking-tight text-cyan-700">
              Browse All Products
              <FiArrowUpRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareMarketplace;
