"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Função utilitária para unir classes do Tailwind

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((x) => x);

  const breadcrumbs = [
    { name: "Página Principal", href: "/" },
    { name: "Produtos", href: "/teste" },
    { name: "Carrinho", href: "/cart" },
    { name: "Fale Conosco!", href: "/ContactForm" },
  ];

  return (
    <div className="flex gap-2">
      {breadcrumbs.map((breadcrumb, index) => {
        const isActive = pathname === breadcrumb.href;
        return (
          <Link
            key={index}
            href={breadcrumb.href}
            className={cn(
              "px-4 py-1 rounded-full text-white",
              isActive ? "bg-purple-500" : "bg-gray-300"
            )}
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
