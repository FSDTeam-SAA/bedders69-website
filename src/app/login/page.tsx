import { LoginForm } from "@/features/auth/login/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Bedders - UK Care Industry Ecosystem",
  description: "Login to your Bedders account to manage care services, jobs, marketplace, and recruitment.",
};

export default function LoginPage() {
  return <LoginForm />;
}
