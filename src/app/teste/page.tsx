import { getProducts } from "@/lib/db/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@prisma/client";

export const metadata = {
  title: "Produtos - Barraquinha do Bidarra",
};

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold my-4">Os produtos mais mágicos do mundo com descontos imperdíveis</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
