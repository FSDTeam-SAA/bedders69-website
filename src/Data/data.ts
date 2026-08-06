import { CareCompanyCardProps } from "@/components/shared/careCard";
import { ProductCardProps } from "@/components/shared/ProductCard";

export const companies: CareCompanyCardProps[] = [
  {
    name: "Sunrise Care Group",
    location: "Manchester, Greater Manchester",
    rating: "4.8",
    reviews: "142 reviews",
    tags: ["Residential", "Dementia Care"],
  },
  {
    name: "Helping Hands Care",
    location: "London, Greater London",
    rating: "4.9",
    reviews: "186 reviews",
    tags: ["Home Care", "Elderly Care"],
  },
  {
    name: "Care Support UK",
    location: "Birmingham, West Midlands",
    rating: "4.7",
    reviews: "98 reviews",
    tags: ["Nursing", "Personal Care"],
  },
  {
    name: "Comfort Care Services",
    location: "Liverpool, Merseyside",
    rating: "4.8",
    reviews: "121 reviews",
    tags: ["Residential", "Supported Living"],
  },
  {
    name: "Trusted Care Ltd",
    location: "Leeds, West Yorkshire",
    rating: "4.9",
    reviews: "164 reviews",
    tags: ["Dementia Care", "Home Care"],
  },
  {
    name: "Bluebell Care Group",
    location: "Bristol, Bristol",
    rating: "4.6",
    reviews: "87 reviews",
    tags: ["Nursing Care", "Residential"],
  },
];


export const products: ProductCardProps[] = [
  {
    name: "Mobile Hoist System",
    seller: "MediCare Supplies Ltd",
    image: "/images/product-1.png",
    category: "Beds & Mattresses",
    rating: "4.9",
    price: "£1,299",
  },
  {
    name: "Digital Medication Dispenser",
    seller: "MediCare Supplies Ltd",
    image: "/images/product-2.png",
    category: "Medication Management",
    rating: "4.9",
    price: "£1,299",
  },
  {
    name: "Folding Rollator Walker",
    seller: "MediCare Supplies Ltd",
    image: "/images/product-3.png",
    category: "Mobility Aids",
    rating: "4.9",
    price: "£1,299",
  },
  {
    name: "Waterproof Care Bed Pads (50pk)",
    seller: "MediCare Supplies Ltd",
    image: "/images/product-4.png",
    category: "Continence Care",
    rating: "4.9",
    price: "£1,299",
  },
];