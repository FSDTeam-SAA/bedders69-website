"use client";

import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Package, CheckCircle2, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import marketplaceApi from "../api/marketplaceApi";
import { MarketplaceItem } from "../types/marketplace.types";

export interface ProductDetailsViewProps {
  productId: string;
}

export const ProductDetailsView = ({ productId }: ProductDetailsViewProps) => {
  const router = useRouter();
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specifications" | "reviews">("overview");

  const { addToCart } = useCart();

  // Backend product state
  const [listing, setListing] = useState<MarketplaceItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Review Form States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Cart alert state
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      setIsLoading(true);
      try {
        const item = await marketplaceApi.getListingByIdOrSlug(productId);
        if (item && isMounted) {
          setListing(item);
        }
      } catch (err) {
        console.warn("Could not load marketplace product details:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setReview("");
      setRating(0);
      setReviewSubmitted(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    if (!listing) return;
    const priceStr =
      typeof listing.price === "number"
        ? `£${listing.price.toLocaleString("en-GB", {
            minimumFractionDigits: listing.price % 1 === 0 ? 0 : 2,
          })}`
        : "£199";

    addToCart(
      {
        id: listing.id,
        title: listing.title,
        price: priceStr,
        rating: "4.9",
        category: listing.category,
        seller: listing.sellerUserId?.fullName || "Verified Care Supplier",
        imageBg: "bg-gradient-to-tr from-sky-400 to-indigo-500",
        imageUrl: listing.photos && listing.photos.length > 0 ? listing.photos[0] : undefined,
      },
      quantity
    );
    setShowCartSuccess(true);
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="bg-[#F4F7FC] min-h-screen pb-20 font-['Wix_Madefor_Text'] relative">
        <div className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="container mx-auto">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-10">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col lg:flex-row gap-10 animate-pulse">
            <div className="w-full lg:w-1/2 aspect-square max-h-[450px] bg-slate-200 rounded-2xl" />
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
              <div className="h-8 w-3/4 bg-slate-200 rounded" />
              <div className="h-6 w-32 bg-slate-200 rounded" />
              <div className="h-20 w-full bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-6 font-['Wix_Madefor_Text']">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <Package className="mx-auto size-12 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-[#1B2C54]">Product Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            The care product you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/marketplace")}
            className="mt-6 rounded-lg bg-[#2D6A9F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20527F]"
          >
            Back to Marketplace
          </button>
        </div>
      </main>
    );
  }

  const priceFormatted =
    typeof listing.price === "number"
      ? `£${listing.price.toLocaleString("en-GB", {
          minimumFractionDigits: listing.price % 1 === 0 ? 0 : 2,
        })}`
      : "£199";

  const sellerName = listing.sellerUserId?.fullName || "Verified Care Supplier";
  const sku = `SKU #${listing.id.slice(-6).toUpperCase()}`;
  const images =
    listing.photos && listing.photos.length > 0
      ? listing.photos
      : [
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
          "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=600",
        ];

  const features = [
    "Certified for UK Healthcare & Care Home Standards",
    "Manufactured with premium medical-grade materials",
    "Engineered for maximum patient comfort, safety, and hygiene",
    "Fully inspected and vetted before dispatch",
    "12-Month UK Manufacturer Warranty Included",
    "Dedicated technical assistance and customer support",
  ];

  const specs: Record<string, string> = {
    "Product Category": listing.category,
    "Price & Currency": `${priceFormatted} (${listing.currency || "GBP"})`,
    "Supplier / Seller": sellerName,
    "Dispatched From": listing.city ? `${listing.city}, UK` : "United Kingdom",
    "Postcode Area": listing.postCode || "UK Nationwide",
    Availability: listing.isAvailable !== false ? "In Stock (Fast UK Delivery)" : "Available on Request",
    "Condition": "Brand New / Certified Medical",
    Warranty: "1 Year Full Warranty",
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-20 font-['Wix_Madefor_Text'] relative">
      {/* Top Breadcrumb Nav */}
      <div className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/marketplace"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to Marketplace
          </Link>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {sku}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-10 flex flex-col gap-10">
        {/* Top Product Showcase */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          {/* Left Gallery Block */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Main Visual Display */}
            <div className="w-full aspect-square md:h-[420px] md:w-[420px] mx-auto rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative shadow-xs">
              {images[selectedThumbnail] ? (
                <img
                  src={images[selectedThumbnail]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center p-6 text-center text-white font-bold">
                  <Package className="size-20" />
                </div>
              )}
            </div>

            {/* Thumbnail Selection Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {images.map((img, idx) => {
                  const isSelected = selectedThumbnail === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedThumbnail(idx)}
                      className={`size-16 rounded-xl overflow-hidden border-2 bg-slate-50 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#2D6A9F] shadow-sm"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Product Overview Block */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-xs font-bold text-[#0A66C2] bg-[#E5F2FC] px-3 py-1 rounded-full uppercase tracking-wider">
                    {listing.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1B2C54] mt-2.5 leading-tight">
                    {listing.title}
                  </h1>
                </div>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-6 border-b border-slate-100 pb-4">
                <span className="text-3xl font-bold text-emerald-700">
                  {priceFormatted}
                </span>
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-700">4.9</span>
                  <span className="text-slate-400">(42 customer reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {listing.description ||
                  `${listing.title} is a verified and certified care product supplied for UK healthcare facilities and private clients.`}
              </p>

              {/* Seller info */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Sold & Supplied by: </span>
                  <span className="font-bold text-[#1B2C54]">{sellerName}</span>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  Verified UK Supplier
                </span>
              </div>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>Quality Verified</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <Truck className="size-4 text-[#0A66C2] shrink-0" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <RefreshCw className="size-4 text-amber-600 shrink-0" />
                  <span>Warranty Included</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Action Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="size-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-12 text-center font-bold text-slate-800 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="size-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 w-full bg-[#2D6A9F] hover:bg-[#20527F] text-white py-3.5 px-6 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-98"
              >
                <ShoppingCart className="size-4" />
                Add to Cart ({priceFormatted})
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section (Overview, Specs, Reviews) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
          <div className="flex border-b border-slate-100 gap-8 text-sm font-bold">
            {(["overview", "specifications", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 transition-all uppercase tracking-wider cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? "text-[#2D6A9F] border-[#2D6A9F]"
                    : "text-slate-400 border-transparent hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="flex flex-col gap-6 text-sm text-slate-600 leading-relaxed">
              <p>
                {listing.description ||
                  `The ${listing.title} is designed for optimal performance, durability, and safety across UK care homes, supported living, and home care settings.`}
              </p>
              <div>
                <h3 className="text-base font-bold text-[#1B2C54] mb-3">Key Features:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(specs).map(([key, val], idx) => (
                <div
                  key={idx}
                  className="flex justify-between p-3.5 bg-slate-50 rounded-xl text-xs border border-slate-100"
                >
                  <span className="font-semibold text-slate-500">{key}:</span>
                  <span className="font-bold text-slate-800">{String(val)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-6">
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 max-w-xl">
                <h4 className="text-sm font-bold text-[#1B2C54]">Leave a Customer Review</h4>
                <div className="flex items-center gap-1 text-amber-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className={`size-6 ${
                        (hoverRating || rating) >= star ? "fill-current" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                  required
                />
                <textarea
                  rows={3}
                  placeholder="Your Review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                  required
                />
                <button
                  type="submit"
                  className="w-40 bg-[#2D6A9F] hover:bg-[#20527F] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Cart Success Alert */}
      {showCartSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm animate-fade-in font-['Wix_Madefor_Text']">
          <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Added to Cart!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5">
              {listing.title} has been added to your shopping cart.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsView;
