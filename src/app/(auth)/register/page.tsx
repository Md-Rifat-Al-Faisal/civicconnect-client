"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { AnimatedCard, PrimaryButton } from "@/components/shared/theme-ui";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name as you want it shown on your profile.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please create a password.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter (A-Z).";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter (a-z).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      image: photoURL.trim() ? photoURL.trim() : undefined,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    if (data) {
      toast.success("Account created successfully! Welcome to CivicConnect.");
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setGoogleLoading(false);
      toast.error("Google authentication failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Join CivicConnect
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create an account to organize, join, and support local community events
          </p>
        </div>

        <AnimatedCard className="p-8">
          <p className="mb-4 text-xs text-muted-foreground">
            Fields marked with <span className="text-destructive font-bold">*</span> are required.
          </p>
          <form onSubmit={handleRegister} className="space-y-4">
            <FormField
              label="Your Full Name"
              htmlFor="name"
              required
              hint="As you want it shown on your profile"
              error={errors.name}
            >
              <div className="relative">
                <User className="absolute top-3 left-3 size-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Rafiqul Islam"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className="pl-9"
                />
              </div>
            </FormField>

            <FormField
              label="Email Address"
              htmlFor="email"
              required
              hint="You will use this to log in"
              error={errors.email}
            >
              <div className="relative">
                <Mail className="absolute top-3 left-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="volunteer@civicconnect.org"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className="pl-9"
                />
              </div>
            </FormField>

            <FormField
              label="Profile Photo Link (optional)"
              htmlFor="photoURL"
              optional
              hint="Paste a link to your photo, or leave empty"
              error={errors.photoURL}
            >
              <div className="relative">
                <ImageIcon className="absolute top-3 left-3 size-4 text-muted-foreground" />
                <Input
                  id="photoURL"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={photoURL}
                  onChange={(e) => {
                    setPhotoURL(e.target.value);
                    if (errors.photoURL) setErrors((prev) => ({ ...prev, photoURL: "" }));
                  }}
                  className="pl-9"
                />
              </div>
            </FormField>

            <FormField
              label="Create a Password"
              htmlFor="password"
              required
              hint="At least 6 characters, with one uppercase and one lowercase letter"
              error={errors.password}
            >
              <div className="relative">
                <Lock className="absolute top-3 left-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  className="pl-9"
                />
              </div>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`size-3.5 ${
                      password.length >= 6
                        ? "text-primary"
                        : "text-muted-foreground/40"
                    }`}
                  />
                  <span>Minimum 6 characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`size-3.5 ${
                      /[A-Z]/.test(password)
                        ? "text-primary"
                        : "text-muted-foreground/40"
                    }`}
                  />
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`size-3.5 ${
                      /[a-z]/.test(password)
                        ? "text-primary"
                        : "text-muted-foreground/40"
                    }`}
                  />
                  <span>At least one lowercase letter (a-z)</span>
                </div>
              </div>
            </FormField>

            <PrimaryButton
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-2.5"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <UserPlus className="size-4" />
                  <span>Create Account</span>
                </>
              )}
            </PrimaryButton>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground font-semibold">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-2.5 rounded-md border border-border bg-card py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 cursor-pointer"
          >
            {googleLoading ? (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ) : (
              <svg viewBox="0 0 24 24" className="size-4">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Sign in instead
            </Link>
          </p>
        </AnimatedCard>
      </div>
    </div>
  );
}