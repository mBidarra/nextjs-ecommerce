import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Link from "next/link";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Barraquinha do Bidarra`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-4xl font-bold text-purple-600 mb-4">Eita!</h2>
        <p className="text-xl text-purple-500">
          Parece que não temos esse produto,{" "}
          <Link href="/ContactForm" className="underline font-bold text-purple-700">
            fale-conosco
          </Link>{" "}
          para buscarmos ele até os confins do mundo para você!
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
