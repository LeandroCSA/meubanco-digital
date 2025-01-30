"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { menuScheme } from "@/assets/data";

interface SidebarMenuProps {
  closeMenu?: () => void;
}

export default function SidebarMenu({ closeMenu }: SidebarMenuProps) {
  const pathname = usePathname();
  const proj = pathname.split("/")[1] || "";

  return (
    <aside className="relative h-full w-full md:w-64 border-0 md:border-r border-slate-200 bg-gray-100 text-slate-900 p-6 pt-8 dark:bg-gray-900 dark:text-slate-300 dark:border-slate-800">
      <Image
        className="m-auto"
        src="/logo-symbol.svg"
        alt="Next.js logo"
        width={80}
        height={80}
        priority
      />

      <nav className="my-12">
        <ul className="grid gap-3">
          {menuScheme.map((item) => (
            <li key={item.link}>
              <Link
                href={"/" + item.link}
                className={`flex items-center gap-3 px-3 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-600 dark:bg-slate-700 ${
                  proj === item.link && "text-[#01D2C7] border-[#01D2C7]"
                }`}
                onClick={() => {
                  closeMenu && setTimeout(closeMenu, 100);
                }}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>

      <ThemeToggle />
    </aside>
  );
}