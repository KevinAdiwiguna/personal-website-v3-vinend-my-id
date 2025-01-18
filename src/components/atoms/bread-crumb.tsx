"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BreadcrumbProps {
  className?: string;
  linkClassName?: string;
}

export const Breadcrumb = ({ className, linkClassName }: BreadcrumbProps) => {
  const pathname = usePathname() || "/";
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const buildUrl = (index: number) =>
    "/" + pathSegments.slice(0, index + 1).join("/");

  return (
    <nav className={cn("flex items-center gap-2 p-2", className)}>
      <Link href="/" className={cn("hover:underline", linkClassName)}>
        Home
      </Link>
      {pathSegments.map((segment, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-2 text-neutral-400">/</span>
          <Link
            href={buildUrl(index)}
            className={cn("hover:underline", linkClassName)}
          >
            {segment}
          </Link>
        </div>
      ))}
    </nav>
  );
};
