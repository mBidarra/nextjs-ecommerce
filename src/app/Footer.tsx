import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl flex justify-between items-center">
        <div>
          <p>Criado por Matheus.<br /><Link href="https://forms.gle/hvRvqRm9NeW11baAA">Entre em contato comigo.</Link></p>
        </div>
        <div className="flex space-x-8">
          <Link href="/" className="link link-hover">
            Pagina Principal
          </Link>
          <Link href="/products" className="link link-hover">
            Produtos
          </Link>
          <Link href="/cart" className="link link-hover">
            Carrinho
          </Link>
          <Link href="/ContactForm" className="link link-hover">
            Fale conosco
          </Link>
        </div>
        <div>
          <Link href="/" className="flex items-center">
            <Image src={logo} height={40} width={40} alt="Barraquinha do Bidarra logo" />
            <span className="ml-2 text-xl">Barraquinha do Bidarra</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
