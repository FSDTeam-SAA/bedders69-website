"use client";

import React, { useState } from "react";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Package, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

export interface ProductDetailsViewProps {
  productId: string;
}

export const ProductDetailsView = ({ productId }: ProductDetailsViewProps) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  const { addToCart } = useCart();

  // Review Form States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Cart alert state
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  // Simulated product database lookup
  const getProductData = (id: string) => {
    const products: Record<string, any> = {
      "prod-1": {
        id: "prod-1",
        title: "Mobile Hoist System",
        price: "£1,299",
        rating: "4.9",
        category: "Beds & Mattresses",
        seller: "MediCare Supplies Ltd",
        sku: "SKU #212-121",
        description: "A safe and reliable mobile patient lifting system designed to assist caregivers in transferring individuals with limited mobility comfortably and securely across home care, nursing homes, and healthcare facilities.",
        longDescription: "The Mobile Hoist System is designed to safely lift and transfer individuals with limited mobility between beds, wheelchairs, chairs, and other seating areas. It helps reduce caregiver strain while ensuring safe and comfortable patient transfers in both home and professional care settings.",
        features: [
          "Portable and easy to maneuver",
          "Strong steel frame construction",
          "Electric lifting mechanism",
          "Emergency stop function",
          "Lockable rear wheels",
          "Adjustable lifting arm",
          "Comfortable sling compatibility",
          "Battery-powered operation",
          "Suitable for home and care facilities"
        ],
        specs: {
          "Product Type": "Mobile Patient Hoist",
          "Maximum Weight Capacity": "180 kg",
          "Lifting Range": "450 mm – 1700 mm",
          "Power Source": "Rechargeable Battery",
          "Frame Material": "Powder-Coated Steel",
          "Wheel Type": "Lockable Medical Casters",
          "Foldable": "Yes",
          "Warranty": "2 Years"
        },
        images: ["/images/product-1.png", "/images/product-2.png", "/images/product-3.png", "/images/product-4.png"],
        imageBg: "bg-gradient-to-tr from-sky-400 to-indigo-500",
      },
      "prod-2": {
        id: "prod-2",
        title: "Digital Medication Dispenser",
        price: "£149",
        rating: "4.8",
        category: "Medication Management",
        seller: "MediCare Supplies Ltd",
        sku: "SKU #334-912",
        description: "An automatic pill dispenser that organizes, schedules, and dispenses medication safely, prompting patients with sound and visual alarms.",
        longDescription: "Ensure medications are taken correctly and on time. This digital dispenser manages complicated drug regimens with automated alerts and lockable storage to prevent double dosing.",
        features: [
          "Automated compartment carousel",
          "Audible and visual alarms",
          "Lockable lid with safety key",
          "Easy-to-read LCD clock display",
          "Battery and USB dual power options",
          "Accompanying dosage templates"
        ],
        specs: {
          "Product Type": "Automatic Pill Dispenser",
          "Compartments": "28 slots",
          "Alarms": "Up to 6 times daily",
          "Power Source": "4x AA batteries or USB",
          "Locking Mechanism": "Key locked",
          "Warranty": "1 Year"
        },
        images: ["/images/product-2.png", "/images/product-3.png", "/images/product-4.png", "/images/product-1.png"],
        imageBg: "bg-gradient-to-tr from-emerald-400 to-teal-500",
        imageUrl: "/images/product-2.png"
      },
      "prod-3": {
        id: "prod-3",
        title: "Folding Rollator Walker",
        price: "£89",
        rating: "4.7",
        category: "Mobility Aids",
        seller: "MediCare Supplies Ltd",
        sku: "SKU #445-671",
        description: "A lightweight, robust folding walker featuring a comfortable padded seat, lockable loop brakes, and a convenient storage basket under the seat.",
        longDescription: "Ideal for indoor and outdoor walking assistance, this folding rollator walker gives individuals the confidence and security to move independently with stability.",
        features: [
          "Lightweight aluminum frame",
          "Foldable design for easy transport",
          "Padded seat and backrest",
          "Under-seat storage bag",
          "Height-adjustable handles",
          "Loop brake system"
        ],
        specs: {
          "Product Type": "Folding Walker",
          "Weight Capacity": "136 kg",
          "Item Weight": "7.5 kg",
          "Seat Height": "540 mm",
          "Frame Material": "Aluminum",
          "Wheels": "8-inch PVC casters"
        },
        images: ["/images/product-3.png", "/images/product-4.png", "/images/product-1.png", "/images/product-2.png"],
        imageBg: "bg-gradient-to-tr from-orange-400 to-amber-500",
        imageUrl: "/images/product-3.png"
      },
      "prod-4": {
        id: "prod-4",
        title: "Waterproof Care Bed Pads (50pk)",
        price: "£29",
        rating: "4.9",
        category: "Continence Care",
        seller: "MediCare Supplies Ltd",
        sku: "SKU #556-324",
        description: "Ultra-absorbent disposable bed protection pads designed to lock away moisture and keep sheets and mattresses clean and dry.",
        longDescription: "Super-absorbent technology ensures rapid fluid absorption to prevent leaks. The soft, hypoallergenic top sheet keeps patient skin comfortable and dry.",
        features: [
          "High-capacity absorbent core",
          "Waterproof backing barrier",
          "Soft, non-woven top cover",
          "Odour-neutralising technology",
          "Pack of 50 sheets"
        ],
        specs: {
          "Product Type": "Incontinence Underpads",
          "Dimensions": "60 cm x 90 cm",
          "Pack Quantity": "50 pads",
          "Absorbency Level": "Super Absorbent",
          "Hypoallergenic": "Yes"
        },
        images: ["/images/product-4.png", "/images/product-1.png", "/images/product-2.png", "/images/product-3.png"],
        imageBg: "bg-gradient-to-tr from-purple-400 to-violet-500",
        imageUrl: "/images/product-4.png"
      }
    };

    return products[id] || products["prod-1"];
  };

  const product = getProductData(productId);

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
    addToCart(product, quantity);
    setShowCartSuccess(true);
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 3000);
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
            {product.sku}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-10 flex flex-col gap-12">
        
        {/* Top Product Showcase (Figma: Frame 2147234736) */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          
          {/* Left Gallery Block (Figma: Frame 2147234729) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            
            {/* Main Visual Display */}
            <div className="w-full aspect-square md:h-[450px] md:w-[450px] mx-auto rounded-2xl bg-slate-50 border border-slate-100/80 overflow-hidden flex items-center justify-center relative">
              {product.images[selectedThumbnail] ? (
                <img
                  src={product.images[selectedThumbnail]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${product.imageBg} flex items-center justify-center`}>
                  <Package className="size-20 text-white/90" />
                </div>
              )}
            </div>

            {/* Thumbnail Selection Strip */}
            <div className="flex gap-3 justify-center">
              {product.images.map((img: string, idx: number) => {
                const isSelected = selectedThumbnail === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumbnail(idx)}
                    className={`size-16 rounded-xl overflow-hidden border-2 bg-slate-50 transition-all cursor-pointer ${
                      isSelected ? "border-[#2D6A9F] shadow-sm" : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Product Options Info (Figma: Frame 2147234735) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between py-2">
            
            <div className="flex flex-col gap-5">
              
              {/* Manufacturer SKU Header line */}
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                <span>{product.seller}</span>
                <span>{product.sku}</span>
              </div>

              {/* Title & Stars */}
              <div className="flex flex-col gap-2.5">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#1B2C54] leading-tight">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 fill-amber-400 text-amber-400`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 ml-1">
                    {product.rating} (42 Reviews)
                  </span>
                </div>
              </div>

              {/* Short description */}
              <p className="text-base text-slate-500 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Category Pill Tag */}
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-bold text-slate-400">Category:</span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg">
                  {product.category}
                </span>
              </div>

            </div>

            {/* Price Quantity Actions footer */}
            <div className="flex flex-col gap-5 mt-8 border-t border-slate-100 pt-6">
              
              <div className="flex items-center justify-between">
                
                {/* Quantity input switcher */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-400 uppercase">Quantity</span>
                  <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-2.5 py-1 bg-white select-none">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-slate-400 hover:text-slate-800 transition-colors p-1 cursor-pointer"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="text-base font-extrabold text-slate-700 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-slate-400 hover:text-slate-800 transition-colors p-1 cursor-pointer"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Price display */}
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase">Price</span>
                  <span className="text-3xl font-extrabold text-[#2D6A9F]">
                    {product.price}
                  </span>
                </div>

              </div>

              {/* Checkout CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-white hover:bg-[#E5F2FC] text-[#2D6A9F] border border-[#2D6A9F]/40 hover:border-[#2D6A9F] rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingCart className="size-4" />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#2D6A9F] hover:bg-[#20527F] text-white rounded-2xl text-sm font-bold transition-all cursor-pointer text-center active:scale-98 shadow-sm hover:shadow"
                >
                  Buy Now
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Middle Tabs Overview (Figma: Frame 2147234739) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-[#1B2C54]">
              Product Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Description Column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
                Description
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {product.longDescription}
              </p>
            </div>

            {/* Key Features Column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
                Key Features
              </h3>
              <ul className="flex flex-col gap-2">
                {product.features.map((feat: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-500 flex items-start gap-2 font-medium">
                    <span className="size-1.5 rounded-full bg-[#2D6A9F] shrink-0 mt-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
                Technical Specifications
              </h3>
              
              <div className="flex flex-col gap-2">
                {Object.entries(product.specs).map(([key, val]: any) => (
                  <div key={key} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">{key}</span>
                    <span className="text-slate-700 font-bold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Reviews Form section (Figma: Reviews) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-[#1B2C54]">
              Reviews
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Rating Stars Selection */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800">
                Your Rating
              </h3>
              
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = rating >= star || hoverRating >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="cursor-pointer focus:outline-none transition-transform active:scale-90"
                    >
                      <Star
                        className={`size-8 transition-colors ${
                          isFilled ? "fill-amber-400 text-amber-400" : "text-slate-200"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">
                Click to rate this care product out of 5 stars. Your rating will help other care managers choose reliable equipment.
              </p>
            </div>

            {/* Review Form fields */}
            <form onSubmit={handleReviewSubmit} className="w-full lg:w-2/3 flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-medium"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-medium"
                    required
                  />
                </div>

              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Your Review *
                </label>
                <textarea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#2D6A9F] font-medium"
                  required
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none mt-1">
                <input
                  type="checkbox"
                  checked={saveDetails}
                  onChange={(e) => setSaveDetails(e.target.checked)}
                  className="rounded border-slate-200 text-[#2D6A9F] focus:ring-[#2D6A9F] size-4.5 cursor-pointer"
                />
                <span className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Save my name, email, and website in this browser for the next time I comment.
                </span>
              </label>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  Submit
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

      {/* Cart success alert toast */}
      {showCartSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm animate-fade-in font-['Wix_Madefor_Text']">
          <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Added to Cart!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5">
              {quantity}x {product.title} has been added to your shopping cart.
            </span>
          </div>
        </div>
      )}

      {/* Review submit toast */}
      {reviewSubmitted && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm animate-fade-in font-['Wix_Madefor_Text']">
          <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Review Submitted!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5">
              Thank you for sharing your experience. Your review is pending approval.
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
