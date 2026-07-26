"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ReceiptText,
  FileCheck,
  BellRing,
  Terminal,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

interface SidebarProps {
  user:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      }
    | undefined;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    section: "main",
  },
  {
    label: "GST Filing",
    href: "/dashboard/gst",
    icon: ReceiptText,
    section: "main",
    badge: "2",
  },
  {
    label: "Deadlines",
    href: "/dashboard/deadlines",
    icon: BellRing,
    section: "main",
  },
  {
    label: "AI Assistant",
    href: "/dashboard/ai",
    icon: Terminal,
    section: "tools",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    section: "tools",
  },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0C0E14] border-r border-white/5 flex flex-col z-50">
      {/* {logo} */}
      <div className="px-6 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5C1A] to-[#FF8040] flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Building2 size={15} color="white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            Bharat<span className="text-[#FF5C1A]">Comply</span>
          </span>
        </Link>
      </div>

      {/* navigation */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] text-white/20 uppercase tracking-widest px-3 mb-2font-mono">
          Main
        </p>
        {navItems
          .filter((i) => i.section === "main")
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all no-underline relative group",
                  isActive
                    ? "bg-white/6 text-white"
                    : "text-white/35 hover:text-white/65 hover:bg-white/4",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FF55C1A] rounded-r-full"
                  />
                )}

                <item.icon
                  size={16}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-[#FF5C1A]" : "group-hover:text-white/60",
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-[#FF5C1A] text-white px-1.5 py-0.5 rounded-full font-medium ">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

        <p className="text-[10px] text-white/20 uppercase tracking-widest px-3 mb-2 mt-5 font-mono">
          Tools
        </p>

        {navItems
          .filter((i) => i.section === "tools")
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all no-underline relative group",
                  isActive
                    ? "bg/white/6 text-white"
                    : "text-white/35 hover:text-white/65 hover:bg-white/4",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FF5C1A] rounded-r-full"
                  />
                )}
                <item.icon
                  size={16}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-[#FF5C1A]" : "group-hover:text-white/60",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
      </nav>

      {/* user section */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/3 border border-white/6 mb-2">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-8 h-8 rounded-full ring-2 ring-white/10"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5C1A] to-[#FF8040] flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.[0] || "U"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate">
              {user?.name}
            </p>
            <p className="text-[10px] text-white/30 truncate font-mono">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
