"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
      <div className="relative overflow-hidden rounded-sm border-2 border-border bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/5 p-8 sm:p-12 lg:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-sm bg-blue-600 text-white shadow-none dark:bg-blue-600 dark:text-white">
            <Mail className="size-6" />
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Stay Connected with Local Social Causes
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Receive monthly summaries of volunteer drives, disaster assistance calls,
            and community updates happening across your district.
          </p>

          {subscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
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
                className="h-12 w-full sm:max-w-md rounded-sm bg-card text-foreground"
              />
              <Button
                type="submit"
                className="h-12 rounded-sm px-6 font-semibold"
              >
                <Send className="size-4" />
                <span>Subscribe</span>
              </Button>
            </form>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            No spam. Unsubscribe at any time. Your email is kept private.
          </p>
        </div>
      </div>
    </section>
  );
}
