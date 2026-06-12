import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black tracking-widest text-slate-100 flex items-center gap-1.5 uppercase">
            ⚡ StormTarget
          </span>
          <span className="text-xs text-slate-500 font-medium tracking-wide">
            Operational Dashboard SignIn
          </span>
        </div>
        <SignIn
          path="/storm-map/sign-in"
          routing="path"
          signUpUrl="/storm-map/sign-up"
          appearance={{
            variables: {
              colorPrimary: "#dc2626",
              colorBackground: "#0f172a",
              colorText: "#f8fafc",
              colorTextSecondary: "#94a3b8",
              colorInputBackground: "#020617",
              colorInputText: "#f8fafc",
              colorBorder: "#334155",
            },
            elements: {
              card: "shadow-none border-none bg-transparent",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200",
              formButtonPrimary: "bg-red-600 hover:bg-red-500 text-white font-extrabold uppercase tracking-wider",
              footerActionLink: "text-red-500 hover:text-red-400 font-bold",
            }
          }}
        />
      </div>
    </div>
  );
}
