import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  return products;
}
