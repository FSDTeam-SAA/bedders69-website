import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";

export interface ProductCardProps {
  name: string;
  seller: string;
  image: string;
  category: string;
  rating: string;
  price: string;
}

const ProductCard = ({ name, seller, image, category, rating, price }: ProductCardProps) => {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-xl bg-white">
      <div className="relative h-56 w-full">
        <Image src={image} alt={name} fill className="object-cover" />

        <span className="absolute left-4 top-4 rounded-3xl bg-cyan-700/80 px-2 py-1 text-xs font-normal leading-4 text-white backdrop-blur-md">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold leading-6 text-stone-950">{name}</h3>

          <p className="text-sm font-normal leading-4 text-zinc-500">
            by {seller}
          </p>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} className="size-3.5 text-yellow-500" />
              ))}
            </div>

            <span className="text-sm font-medium leading-4 text-indigo-900">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="rounded-md bg-cyan-700 px-8 py-2.5 text-sm font-medium leading-4 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition hover:bg-cyan-800">
              Add to Cart
            </button>

            <button className="flex size-10 items-center justify-center rounded-lg border border-cyan-700 text-cyan-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition hover:bg-cyan-50">
              <FaHeart className="size-4" />
            </button>
          </div>

          <span className="text-2xl font-semibold leading-7 text-cyan-700">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;