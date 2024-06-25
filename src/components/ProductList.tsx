import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductListProps {
  sortOrder?: "asc" | "desc";
}

const ProductList: React.FC<ProductListProps> = ({ sortOrder = "asc" }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products?sortOrder=${sortOrder}`);
      const data: Product[] = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [sortOrder]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
