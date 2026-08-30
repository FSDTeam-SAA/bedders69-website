export type PlanType = "free" | "premium" | "business";

export interface PricingPlan {
  id: PlanType;
  name: string;
  price: string;
  description: string;
}
