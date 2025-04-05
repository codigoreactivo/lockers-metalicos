import { useStore } from '@nanostores/react';
import { cartItems } from '../../../cartStore';
import CartTotals from './CartTotals';
import { useEffect, useState } from 'react';

export default function CartSummary() {
  // 1. Todos los hooks primero, en orden consistente
  const [mounted, setMounted] = useState(false);
  const $cartItems = useStore(cartItems);

  // 2. Un solo useEffect
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Cálculos después de los hooks
  const cartItemsList = Object.entries($cartItems)
    .filter(([_, item]) => item && item.id);

  const subtotal = cartItemsList.reduce(
    (sum, [_, item]) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const shipping = subtotal >= 500 ? 0 : 20;

  // 4. Renderizado condicional
  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 oswald uppercase text-black">Cargando...</h3>
      </div>
    );
  }

  if (cartItemsList.length === 0) {
    return null;
  }

  // 5. Renderizado final
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 oswald uppercase text-black">Resumen de la Orden</h3>
      
      <CartTotals
        subtotal={subtotal}
        shipping={shipping}
      />

      <div className="mt-6 space-y-3">
        <a
          href="/checkout"
          className="block w-full text-center bg-black text-white uppercase py-3 rounded-lg oswald text-xl  hover:bg-[#EBBC2A] hover:text-black transition-all duration-300 group"
        >
          Proceder al <span className="text-[#EBBC2A] group-hover:text-black">Pago</span>
        </a>
        <a
          href="/productos"
          className="block w-full text-center text-black bg-white border border-black uppercase py-3 rounded-lg oswald text-xl hover:bg-transparent hover:text-black hover:bg-white transition-colors"
        >
          Seguir Comprando
        </a>
      </div>
    </div>
  );
} 