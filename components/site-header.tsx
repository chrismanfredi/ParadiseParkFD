"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-50 md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900"
          >
            Paradise Park FD
          </Link>
        </div>
        <nav className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition hover:text-zinc-900 ${
                      isActive ? "text-zinc-900" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "36px",
                    height: "36px",
                  },
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <>
              <SignInButton signInUrl="/sign-in">
                <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton signUpUrl="/sign-up">
                <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800">
                  Create account
                </button>
              </SignUpButton>
            </>
          </SignedOut>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "36px",
                    height: "36px",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
          <nav>
            <ul className="flex flex-col gap-4 text-base font-medium text-zinc-700">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-2 transition ${
                        isActive ? "bg-zinc-100 text-zinc-900" : "hover:bg-zinc-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <SignedOut>
              <>
                <SignInButton signInUrl="/sign-in">
                  <button className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton signUpUrl="/sign-up">
                  <button className="w-full rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800">
                    Create account
                  </button>
                </SignUpButton>
              </>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
