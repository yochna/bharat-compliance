

"use client";

import { Mail, Lock, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

export default function LoginPge() {
  return (
    <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl p-8 ">
      {/* heading */}
      <h1 className="text-2xl font-semibold text-[#F0EDE6] mb-1 tracking-tight">
        Welcome Back
      </h1>
      <p className="text-sm text-[#555] mb-8">
        Sign in continue your dashboard
      </p>

      {/* google sign in */}
      <button className="w-full flex items-center justify-center gap-2 bg-white text-[#1A1A1A] text-sm font-medium py-3 rounded-lg hover:bg-gray-100 transition-colors mb-6">
        <Globe size={16} />
        Continue with Google
      </button>

      {/* divider */}
      <div className=" flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[#1E1E1E]" />
        <span className="text-[11px] text-[#444] font-mono">OR</span>
        <div className="flex-1 h-px bg-[#1E1E1E]" />
      </div>

      {/* email field */}
      <div className="mb-4">
        <label className="text-xs text-[#666] mb-2 block">Email address</label>
        <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg px-3 py-2.5 focus-within:border-[#FF5C1A] transition-colors">
            <Mail size={15} className="text-[#444]"/>
            <input type="email" 
            placeholder="you@company.com"
            className="bg-transparent text-sm text-[#F0EDE6] outline-none w-full placeholder:text-[#444]"/>
        </div>
      </div>

      {/* password field */}
      <div className="mb-6">
        <label className="text-xs text-[#666] mb-2 block">Password</label>
        <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg px-3 pyu-2.5 focus-within:border-[#FF5C1A] transition-colors">
            <Lock size={15} className="text-[#444]" />
            <input type="password"
            placeholder="*******"
            className="bg-transparent text-sm text-[#F0EDE6] outline-none w-full placeholder:text-[#444]" />
        </div>
      </div>

      {/* submit */}
      <Button variant="primary" size="lg" className="w-full justify-center mb-6">
        Sign in <ArrowRight size={15}/>
      </Button>

      {/* footer link */}
      <p className="text-center text-sm text-[#555]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#FF5C1A] hover:underline">
        Sign up
        </Link>
      </p>
    </div>
  );
}
