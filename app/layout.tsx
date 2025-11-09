import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { syncMemberFromClerk } from "@/lib/sync-clerk-user";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paradise Park FD Portal",
  description: "Member access portal powered by Clerk authentication.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  await syncMemberFromClerk(user);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen flex-col bg-zinc-50 font-sans antialiased">
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-6xl flex-1 px-6 pb-10 pt-0">
            {children}
          </main>
          <SiteFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}
