"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, PackageOpen, Eye } from "lucide-react";
import Link from "next/link";
import marketplaceApi from "../api/marketplaceApi";
import { MarketplaceItem, ProductProps } from "../types/marketplace.types";

export type { ProductProps };

interface MarketplaceListProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (product: ProductProps) => void;
}

const gradientBackgrounds = [
  "bg-gradient-to-tr from-sky-400 to-indigo-500",
  "bg-gradient-to-tr from-emerald-400 to-teal-500",
  "bg-gradient-to-tr from-orange-400 to-amber-500",
  "bg-gradient-to-tr from-purple-400 to-violet-500",
  "bg-gradient-to-tr from-blue-400 to-cyan-500",
  "bg-gradient-to-tr from-rose-400 to-pink-500",
];

export const MarketplaceList = ({
  searchQuery,
  selectedCategory,
  onAddToCart,
}: MarketplaceListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [backendItems, setBackendItems] = useState<MarketplaceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      setIsLoading(true);
      try {
        const res = await marketplaceApi.getListings({ limit: 50, page: 1 });
        if (res && res.data && isMounted) {
          setBackendItems(res.data);
        }
      } catch (err) {
        console.warn("Error fetching marketplace products:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Map backend items to ProductProps
  const allProducts = useMemo<ProductProps[]>(() => {
    if (backendItems && backendItems.length > 0) {
      return backendItems.map((item, idx) => {
        const priceStr =
          typeof item.price === "number"
            ? `£${item.price.toLocaleString("en-GB", {
                minimumFractionDigits: item.price % 1 === 0 ? 0 : 2,
              })}`
            : "£99";

        const ratingVal = (4.7 + (idx % 3) * 0.1).toFixed(1);
        const photo =
          item.photos && item.photos.length > 0 ? item.photos[0] : undefined;

        return {
          id: item.id,
          title: item.title,
          price: priceStr,
          rawPrice: item.price,
          rating: ratingVal,
          category: item.category,
          seller: item.sellerUserId?.fullName || "Verified Care Supplier",
          imageBg: gradientBackgrounds[idx % gradientBackgrounds.length],
          imageUrl: photo,
          description: item.description,
        };
      });
    }

    return [];
  }, [backendItems]);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Search Query
      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesSeller = product.seller.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSeller && !matchesCategory && !matchesDesc)
          return false;
      }

      // 2. Category selection
      if (selectedCategory && selectedCategory !== "All") {
        const catLower = selectedCategory.toLowerCase();
        const prodCatLower = product.category.toLowerCase();
        const matchesCat =
          prodCatLower.includes(catLower) || catLower.includes(prodCatLower);
        if (!matchesCat) return false;
      }

      return true;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 380, behavior: "smooth" });
      }
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-6 font-['Wix_Madefor_Text'] w-full">
      {/* Header Info */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-['Poppins']">
            Available Products{" "}
            <span className="text-sm font-normal text-slate-500">
              ({totalItems} found)
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified care equipment, supplies, and technology
          </p>
        </div>
        {totalItems > 0 && (
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col gap-4 animate-pulse"
            >
              <div className="w-full h-48 bg-slate-200 rounded-2xl" />
              <div className="h-5 w-2/3 bg-slate-200 rounded" />
              <div className="h-4 w-1/3 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Product Grid Cards */}
      {!isLoading && paginatedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => {
            const productSlug = encodeURIComponent(
              product.title.toLowerCase().replace(/\s+/g, "-")
            );
            const productUrl = `/marketplace/${productSlug}`;

            return (
              <div
                key={product.id}
                className="group bg-white border border-slate-100 rounded-3xl p-5 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.06)] hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.12)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Top Image Box */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-50 border border-slate-100/80 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${product.imageBg} flex items-center justify-center text-white/90 p-4 text-center`}
                    >
                      <span className="font-bold text-base line-clamp-2">
                        {product.title}
                      </span>
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/50 shadow-xs">
                    {product.category}
                  </span>
                </div>

                {/* Info Block */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium truncate max-w-[180px]">
                      {product.seller}
                    </span>
                    <div className="flex items-center gap-1 text-slate-700 font-bold shrink-0">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <Link href={productUrl} className="block cursor-pointer">
                    <h3 className="text-base font-bold text-[#1B2C54] group-hover:text-cyan-700 transition-colors line-clamp-1 leading-snug">
                      {product.title}
                    </h3>
                  </Link>

                  {product.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Bottom Row: Price & Actions */}
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100/80 gap-3">
                  <div className="text-lg font-bold text-emerald-700">
                    {product.price}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={productUrl}
                      className="size-9 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="size-4" />
                    </Link>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#2D6A9F] hover:bg-[#20527F] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <ShoppingCart className="size-3.5 stroke-[2.5]" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && paginatedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-200 text-center shadow-sm">
          <div className="size-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 mb-3">
            <PackageOpen className="size-7" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C54]">
            No care products found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            No products match your search or selected category. Try selecting another category or resetting your query.
          </p>
        </div>
      )}

      {/* Dynamic Pagination Bar */}
      {!isLoading && totalItems > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-slate-200/80 font-['Poppins']">
          <span className="text-xs text-slate-500 font-medium">
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous Arrow */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                currentPage === 1
                  ? "text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50"
                  : "text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer active:scale-95 shadow-sm bg-white"
              }`}
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageItem, idx) => {
              if (pageItem === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="text-slate-400 px-1 text-xs select-none"
                  >
                    ...
                  </span>
                );
              }

              const pageNum = pageItem as number;
              const isActive = currentPage === pageNum;

              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? "bg-[#2D6A9F] text-white border border-[#2D6A9F] shadow-cyan-900/10"
                      : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Arrow */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? "text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50"
                  : "text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer active:scale-95 shadow-sm bg-white"
              }`}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceList;
