import { FaTrash } from 'react-icons/fa';
import { updateQuantity, removeCartItem } from '../../../cartStore';

export default function CartItem({ item, itemKey }: { item: any, itemKey: string }) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      updateQuantity(itemKey, value);
    }
  };

  return (
    <div className="flex gap-6 border-b border-gray-200 py-6">
      <div className="w-32 h-32">
        <img
          src={item.sourceUrl}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg border"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-medium">{item.name}</h3>
            {item.variation && (
              <p className="text-sm text-gray-600 capitalize">
                Color: {item.variation.attributes?.nodes?.[0]?.value}
              </p>
            )}
          </div>
          <p className="text-gray-500 text-2xl oswald uppercase">S/ {item.price}</p>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center bg-gray-50 rounded-lg">
            <button
              onClick={() => updateQuantity(itemKey, item.quantity - 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="w-16 h-10 text-center bg-transparent border-none focus:ring-0 text-lg oswald"
            />
            <button
              onClick={() => updateQuantity(itemKey, item.quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeCartItem(itemKey)}
            className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
          >
            <FaTrash />
            <span>Eliminar</span>
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Subtotal: S/ {(parseFloat(item.price) * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
} 