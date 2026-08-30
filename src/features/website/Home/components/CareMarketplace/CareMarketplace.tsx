"use client";

import ProductCard from "@/components/shared/ProductCard";
import { useMarketplaceListings } from "../../hooks/useHome";
import { FiArrowUpRight } from "react-icons/fi";
import { ShoppingBag, RefreshCw } from "lucide-react";
import Link from "next/link";

const CareMarketplace = () => {
  const { products, isLoading, error, refetch } = useMarketplaceListings({
    limit: 4,
    page: 1,
  });

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

          <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex-1 text-base font-normal leading-6 text-neutral-700">
              Software, equipment, training and supplies
            </p>

            <Link
              href="/marketplace"
              className="flex items-center gap-2 text-lg font-bold leading-5 tracking-tight text-cyan-700 transition hover:text-cyan-800"
            >
              Browse All Products
              <FiArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="h-48 w-full animate-pulse rounded-xl bg-slate-200" />
                <div className="mt-3 flex flex-col gap-2">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 flex justify-between items-center">
                    <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
                    <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center mx-auto">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
            >
              <RefreshCw className="size-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!products || products.length === 0) && (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center mx-auto">
            <div className="flex size-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
              <ShoppingBag className="size-7" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-slate-800">
                No marketplace products listed yet
              </h3>
              <p className="text-sm text-slate-500">
                Approved care products, equipment and supplies from suppliers will appear here automatically.
              </p>
            </div>
            <Link
              href="/login"
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-800"
            >
              Become a Supplier
            </Link>
          </div>
        )}

        {/* Live Marketplace Products Grid from Backend API */}
        {!isLoading && !error && products && products.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const image =
                product.photos && product.photos.length > 0
                  ? product.photos[0]
                  : "/images/product-1.png";

              const priceStr =
                product.price !== undefined
                  ? `£${product.price.toFixed(2)}`
                  : "£99.00";

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  seller={product.seller?.name || "Verified Supplier"}
                  category={product.category || "Care Supplies"}
                  price={priceStr}
                  image={image}
                  rating="4.9"
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CareMarketplace;
