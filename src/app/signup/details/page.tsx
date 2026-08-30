import { UserSignupView } from "@/features/auth/user-signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account | Bedders - UK Care Industry Ecosystem",
  description: "Create your Bedders account.",
};

export default function SignupDetailsPage() {
  return <UserSignupView />;
}
