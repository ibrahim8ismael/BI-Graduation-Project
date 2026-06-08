"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferred = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.classList.toggle("dark", preferred === "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <SidebarMenuButton
      tooltip={theme === "light" ? "Dark mode" : "Light mode"}
      onClick={toggle}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
      <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </SidebarMenuButton>
  );
}
