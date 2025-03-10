import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";

export const metadata = {
  title: "Your Cart - Barraquinha do Bidarra",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Carrinho de Compras</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Seu carrinho está vazio...</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Finalizar compra!</button>
      </div>
    </div>
  );
}
