import { SelectTypeView } from "@/features/auth/seletc-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Account Type | Bedders - UK Care Industry Ecosystem",
  description: "Select your account type to register on Bedders.",
};

export default function SelectTypePage() {
  return <SelectTypeView />;
}
