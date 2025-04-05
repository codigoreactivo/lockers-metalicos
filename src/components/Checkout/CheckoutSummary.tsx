import { useStore } from '@nanostores/react';
import { cartItems } from '../../cartStore';

// Usamos la interfaz CartItem tal como está definida en cartStore
interface CartItem {
  id: string;
  name: string;
  price: number; // Ya está como number en cartStore
  quantity: number;
  sourceUrl: string;
}

export default function CheckoutSummary() {
  const items = useStore(cartItems);
  // Simplemente filtramos los items nulos
  const cartList = Object.values(items).filter((item): item is CartItem =>
    Boolean(item)
  );

  // El price ya es number, no necesitamos conversión
  const total = cartList.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-10">
      <h2 className="text-xl font-bold mb-4 oswald">Resumen del Pedido</h2>

      {/* Lista de productos */}
      <div className="space-y-4 mb-6">
        {cartList.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex gap-2">
              <img
                src={item.sourceUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium text-xl oswald">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Cantidad: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium text-xl oswald">
              S/ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t pt-4 oswald">
        <div className="flex justify-between font-bold text-lg">
          <span className="text-2xl">Total</span>
          <span className="text-[#EBBC2A] bg-[#303330] py-1 px-2 rounded-lg text-2xl">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
} 