import { UserSignupView } from "@/features/auth/user-signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account | Bedders - UK Care Industry Ecosystem",
  description: "Create your Bedders user account.",
};

export default function UserSignupPage() {
  return <UserSignupView />;
}
