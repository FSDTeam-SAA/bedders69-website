"use client";

import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export interface ProductCardProps {
  name: string;
  seller: string;
  image: string;
  category: string;
  rating: string;
  price: string;
}

const ProductCard = ({ name, seller, image, category, rating, price }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: name, // Use name as ID for mock products
      title: name,
      price,
      rating,
      category,
      seller,
      imageBg: "bg-slate-100",
      imageUrl: image
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-56 w-full">
        <Image src={image} alt={name} fill className="object-cover" />

        <span className="absolute left-4 top-4 rounded-3xl bg-cyan-700/80 px-2.5 py-1 text-xs font-semibold leading-4 text-white backdrop-blur-md">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold leading-6 text-stone-950 line-clamp-1">{name}</h3>

          <p className="text-xs font-normal leading-4 text-zinc-500">
            by {seller}
          </p>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} className="size-3.5 text-yellow-500" />
              ))}
            </div>

            <span className="text-xs font-medium leading-4 text-indigo-900 ml-1">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`rounded-lg px-6 py-2 text-xs font-bold leading-4 transition duration-200 cursor-pointer ${
                added 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-cyan-700 hover:bg-cyan-800 text-white"
              }`}
            >
              {added ? "Added!" : "Add to Cart"}
            </button>

            <button className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition cursor-pointer">
              <FaHeart className="size-3.5 fill-current" />
            </button>
          </div>

          <span className="text-lg font-bold leading-7 text-cyan-700">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;