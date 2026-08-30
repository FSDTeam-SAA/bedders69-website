"use client";

import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export interface ProductCardProps {
  id?: string;
  name: string;
  seller: string;
  image: string;
  category: string;
  rating?: string;
  price: string;
}

const DEFAULT_IMAGE = "/images/product-1.png";

const ProductCard = ({
  id,
  name,
  seller,
  image = DEFAULT_IMAGE,
  category,
  rating = "4.9",
  price,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(image || DEFAULT_IMAGE);

  const handleAddToCart = () => {
    addToCart({
      id: id || name,
      title: name,
      price,
      rating,
      category,
      seller,
      imageBg: "bg-slate-100",
      imageUrl: imgSrc,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.06)] hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.12)] transition-all duration-300 hover:-translate-y-1">
      {/* Image & Category Badge */}
      <div className="relative h-52 w-full bg-slate-50 overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />

        <span className="absolute left-3.5 top-3.5 rounded-full bg-cyan-700/90 px-3 py-1 text-xs font-semibold leading-4 text-white backdrop-blur-md shadow-sm">
          {category}
        </span>
      </div>

      {/* Info Body */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-bold leading-5 text-slate-800 line-clamp-1">{name}</h3>

          <p className="text-xs font-medium text-slate-400 truncate">
            by <span className="text-slate-600 font-semibold">{seller}</span>
          </p>

          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} className="size-3 text-amber-400" />
              ))}
            </div>

            <span className="text-xs font-bold text-slate-700 ml-1">
              {rating}
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
          <span className="text-base font-extrabold text-cyan-700">
            {price}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToCart}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition duration-200 cursor-pointer shadow-sm ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-cyan-700 hover:bg-cyan-800 text-white"
              }`}
            >
              {added ? "Added!" : "Add to Cart"}
            </button>

            <button
              aria-label="Wishlist"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition cursor-pointer"
            >
              <FaHeart className="size-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;