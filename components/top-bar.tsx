"use client";

import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export function TopBar() {
  return (
    <SignedOut>
      <div className="w-full bg-rose-600 px-6 py-2 text-sm text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="font-medium">
            Join the Paradise Park FD portal to access member resources.
          </p>
          <div className="flex items-center gap-2">
            <SignInButton>
              <button className="rounded-full border border-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide transition hover:bg-white/10">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-600 transition hover:bg-white/90">
                Sign up
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </SignedOut>
  );
}
