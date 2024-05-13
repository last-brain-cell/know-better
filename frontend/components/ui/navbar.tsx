"use client";

import React, { useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import ThemeSwitch from "@/app/ThemeSwitch";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  // const html = document.querySelector("html");
  const html = document.documentElement;
  const isLightOrAuto =
    localStorage.getItem("hs_theme") === "light" ||
    (localStorage.getItem("hs_theme") === "auto" &&
      !window.matchMedia("(prefers-color-scheme: dark)").matches);
  const isDarkOrAuto =
    localStorage.getItem("hs_theme") === "dark" ||
    (localStorage.getItem("hs_theme") === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isLightOrAuto && html.classList.contains("dark"))
    html.classList.remove("dark");
  else if (isDarkOrAuto && html.classList.contains("light"))
    html.classList.remove("light");
  else if (isDarkOrAuto && !html.classList.contains("dark"))
    html.classList.add("dark");
  else if (isLightOrAuto && !html.classList.contains("light"))
    html.classList.add("light");

  return (
    <html>
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
          className,
        )}
      >
        <Menu>
          <MenuItem item="Home" sectionId="hero"></MenuItem>
          <MenuItem item="About" sectionId="hero"></MenuItem>
          <MenuItem item="How To" sectionId="hero"></MenuItem>
          <MenuItem item="Contact" sectionId="hero"></MenuItem>
          <button
            className="relative inline-flex h-6.5 pb-0.5 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => {
              window.location.href = "/auth/signin";
            }}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              {" "}
              Sign In{" "}
            </span>
          </button>

          <div className="fitted inline-flex h-7 overflow-hidden pt-1.5">
            <ThemeSwitch />
          </div>
        </Menu>
      </div>
    </html>
  );
}
