import { cn } from "@/app/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-centre justify-centre gap-2 font-medium transition-all duration-200 cursor-pointer rounded-md disabled:opacity-50",
        {
           "bg-[#FF5C1A] text-white hover:bg-[#E54E14] active:scale-95 border border-[#FF5C1A]": variant === "primary",
            "bg-transparent text-[#888] border border-[#2A2A2A] hover:border-[#444] hover:text[#CCC] active:scale-95":variant ==="ghost",
            "bg-transparent text-[#FF5C1A] border border-[#FF5C1A] hover:bg-[#FF5C1A]  hover:text-white active:scale-95":variant === "outline",
        },
        {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-sm px-6 py-3":size==="lg",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
