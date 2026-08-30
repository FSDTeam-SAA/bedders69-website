import { SelectTypeView } from "@/features/auth/seletc-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Account Type | Bedders - UK Care Industry Ecosystem",
  description: "Select your account type to register as a user, care company, recruitment agency, carer, product supplier, or service provider.",
};

export default function SignupPage() {
  return <SelectTypeView />;
}
