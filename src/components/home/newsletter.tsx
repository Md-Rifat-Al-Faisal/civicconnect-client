"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PrimaryButton, SectionHeading } from "@/components/shared/theme-ui";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Thank you for subscribing to CivicConnect community dispatches!");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/40 to-accent/10 p-8 shadow-soft sm:p-12 lg:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Mail className="size-6" />
          </div>

          <SectionHeading
            centered
            title="Stay Connected with Local Social Causes"
            subtitle="Receive monthly summaries of volunteer drives, disaster assistance calls, and community updates happening across your district."
          />

          {subscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="size-5" />
              <span>You are subscribed to the CivicConnect community newsletter!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <Input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full sm:max-w-md bg-card text-foreground"
              />
              <PrimaryButton
                type="submit"
                className="h-11 px-6 font-semibold gap-2"
              >
                <Send className="size-4" />
                <span>Subscribe</span>
              </PrimaryButton>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Unsubscribe at any time. Your email is kept private.
          </p>
        </div>
      </div>
    </section>
  );
}