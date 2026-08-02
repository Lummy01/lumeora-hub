import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Lumeora Hub and start sharing your creative work."
    >
      <SignupForm />
    </AuthLayout>
  );
}