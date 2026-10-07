"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "./brand";
import { Flip } from "./ui";

// Current page gets aria-current (styled as an underline). Links inside the mobile menu also close it.
export function NavLinks({ className, closesMenu = "" }: { className: string; closesMenu?: string }) {
  const pathname = usePathname();
  return (
    <>
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={className}
          aria-current={pathname === item.href ? "page" : undefined}
          onClick={closesMenu ? () => document.getElementById(closesMenu)?.hidePopover() : undefined}
        >
          <Flip>{item.label}</Flip>
        </Link>
      ))}
    </>
  );
}
