import React, { useState } from "react";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import Link from "next/link";

export interface ProductProps {
  id: string;
  title: string;
  price: string;
  rating: string;
  category: string;
  seller: string;
  imageBg: string;
  imageUrl?: string;
}

interface MarketplaceListProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (product: ProductProps) => void;
}

export const MarketplaceList = ({
  searchQuery,
  selectedCategory,
  onAddToCart,
}: MarketplaceListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const initialProducts: ProductProps[] = [
    {
      id: "prod-1",
      title: "Mobile Hoist System",
      price: "£1,299",
      rating: "4.9",
      category: "Beds & Mattresses",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-sky-400 to-indigo-500",
      imageUrl: "/images/product-1.png",
    },
    {
      id: "prod-2",
      title: "Digital Medication Dispenser",
      price: "£149",
      rating: "4.8",
      category: "Medication Management",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-emerald-400 to-teal-500",
      imageUrl: "/images/product-2.png",
    },
    {
      id: "prod-3",
      title: "Folding Rollator Walker",
      price: "£89",
      rating: "4.7",
      category: "Mobility Aids",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-orange-400 to-amber-500",
      imageUrl: "/images/product-3.png",
    },
    {
      id: "prod-4",
      title: "Waterproof Care Bed Pads (50pk)",
      price: "£29",
      rating: "4.9",
      category: "Continence Care",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-purple-400 to-violet-500",
      imageUrl: "/images/product-4.png",
    },
    {
      id: "prod-5",
      title: "Remote Monitoring Sensor Kit",
      price: "£399",
      rating: "4.9",
      category: "Technology & Safety",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-blue-400 to-cyan-500",
    },
    {
      id: "prod-6",
      title: "Hoyer Patient Lift",
      price: "£1,599",
      rating: "4.9",
      category: "Moving & Handling",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-rose-400 to-pink-500",
    },
    {
      id: "prod-7",
      title: "Care Training Course Pack",
      price: "£199",
      rating: "4.6",
      category: "Moving & Handling",
      seller: "MediCare Supplies Ltd",
      imageBg: "bg-gradient-to-tr from-teal-400 to-emerald-500",
    }
  ];

  // Filtering products
  const filteredProducts = initialProducts.filter((product) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = product.title.toLowerCase().includes(q);
      const matchesSeller = product.seller.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesSeller && !matchesCategory) return false;
    }

    // 2. Category selection
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-6 font-['Wix_Madefor_Text'] w-full">
      
      {/* Grid of cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                
                {/* Visual Image Block */}
                <Link href={`/marketplace/${product.id}`} className="w-full h-44 bg-slate-100 flex items-center justify-center relative overflow-hidden cursor-pointer block">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full ${product.imageBg} flex items-center justify-center`}>
                      <PackageOpen className="size-12 text-white/95" />
                    </div>
                  )}
                  
                  {/* Category Pill Badge */}
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-700">
                    {product.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-bold text-slate-800">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </Link>

                {/* Info block */}
                <div className="p-4 flex-1 flex flex-col gap-2.5">
                  
                  <div className="flex flex-col gap-0.5">
                    <Link href={`/marketplace/${product.id}`} className="cursor-pointer">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#2D6A9F] transition-colors min-h-[40px]">
                        {product.title}
                      </h3>
                    </Link>
                    <span className="text-[11px] text-slate-400 font-medium">
                      by {product.seller}
                    </span>
                  </div>

                  {/* Price and Cart Action row */}
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-800">
                        {product.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#2D6A9F] hover:bg-[#20527F] text-white p-2 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow flex items-center justify-center gap-1.5 px-3.5 text-xs font-bold active:scale-95"
                    >
                      <ShoppingCart className="size-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl border border-slate-100">
          <p className="text-sm font-medium text-slate-500 text-center">
            No products match your search/category filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-slate-100 font-['Poppins']">
        <span className="text-xs text-slate-400 font-medium">
          Showing 1 to {filteredProducts.length} of {filteredProducts.length} results
        </span>
        
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          
          <button
            onClick={() => setCurrentPage(1)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 1
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            1
          </button>
          
          <button
            onClick={() => setCurrentPage((p) => Math.min(1, p + 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
