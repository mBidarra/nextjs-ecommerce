import Footer from "@/app/Footer";
import Navbar from "@/app/Navbar/Navbar";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "@/app/SessionProvider";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@/app/types";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Barraquinha do Bidarra",
  description: "Seu dinheiro no meu bolso",
};

// Carregar o Carousel dinamicamente para garantir que ele é renderizado apenas no cliente
const Carousel = dynamic(() => import("@/components/Carousel"), { ssr: false });
const Titulo = dynamic(() => import("@/components/titulo"), { ssr: false });

async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  return products;
}

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div className="m-auto min-w-[300px] max-w-7xl p-4">
            <h1 className="text-3xl font-bold my-4">OS MELHORES PRODUTOS DO MUNDO MÁGICO DIGITAL</h1>
            <Carousel products={products} />
            <main>
              <Titulo />
              {children}
            </main>
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
