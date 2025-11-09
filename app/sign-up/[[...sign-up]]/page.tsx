import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="flex w-full flex-1 items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white/70 px-4 py-10 shadow-sm">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-zinc-900 hover:bg-zinc-800",
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </section>
  );
}
