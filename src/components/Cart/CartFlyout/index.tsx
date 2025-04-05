import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems } from '../../../cartStore';
import { useEffect, useState } from 'react';
import CartFlyoutItem from './CartFlyoutItem';

export default function CartFlyout() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartItemsList = Object.entries($cartItems).filter(([_, item]) => item);
  const total = cartItemsList.reduce((sum, [_, item]) =>
    sum + (item?.price || 0) * (item?.quantity || 0), 0
  );

  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (cartItemsList.length > 0) {
      isCartOpen.set(false);
      window.location.href = '/checkout';
    }
  };

  if (!isClient) {
    return (
      <aside className="fixed top-0 right-0 bg-white h-full w-full lg:w-96 lg:p-6 p-4 transform translate-x-full transition-all duration-300 z-50 shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl oswald">Carrito de Compras</h2>
            <button className="p-2 hover:bg-gray-100 rounded">✕</button>
          </div>
          <div className="flex-grow overflow-auto">
            <p className="text-center text-gray-500 mt-8">Cargando carrito...</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed top-0 right-0 bg-white h-full w-full lg:w-96 lg:p-6 p-4 transform transition-all duration-300 z-50 shadow-lg ${$isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl oswald">Carrito de Compras</h2>
          <button
            onClick={() => isCartOpen.set(false)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ✕
          </button>
        </div>

        <div className="flex-grow overflow-auto">
          {cartItemsList.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">El carrito está vacío</p>
          ) : (
            <ul className="space-y-4">
              {cartItemsList.map(([key, item]) => (
                <li key={key}>
                  {item && <CartFlyoutItem item={item} itemKey={key} />}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto pt-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="text-[#EBBC2A] text-2xl oswald">
              S/ {total.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="/carrito"
              className="block w-full text-center uppercase font-medium text-black bg-white p-3 border border-black hover:bg-black hover:text-white transition-all duration-300 rounded oswald text-base lg:text-lg"
            >
              Ver Carrito
            </a>
            <a
              href="/checkout"
              onClick={handleCheckout}
              className={`block w-full text-center uppercase bg-black text-[#EBBC2A] font-medium p-3 rounded oswald text-base lg:text-lg ${cartItemsList.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Proceder al Pago
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
} 