import { useStore } from '@nanostores/react';
import { cartItems } from '../../../cartStore';
import CartItem from './CartItem';

export default function CartList() {
  const $cartItems = useStore(cartItems);
  const cartItemsList = Object.entries($cartItems)
    .filter(([_, item]) => item && item.id);

  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold mb-6 oswald uppercase  text-black">Carrito de Compras</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {cartItemsList.map(([key, item]) => (
          <CartItem key={key} item={item} itemKey={key} />
        ))}
      </div>
    </div>
  );
} 