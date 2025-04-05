import { FaTrash } from 'react-icons/fa';
import { updateQuantity, removeCartItem } from '../../../cartStore';

// Definimos la interfaz directamente en este archivo
interface CartItem {
  id: string;
  name: string;
  price: number;
  sourceUrl: string;
  quantity: number;
  variation?: {
    id?: string;
    attributes?: {
      nodes?: Array<{
        value?: string;
      }>;
    };
  } | null;
}

interface CartFlyoutItemProps {
  item: CartItem;
  itemKey: string;
}

export default function CartFlyoutItem({ item, itemKey }: CartFlyoutItemProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      updateQuantity(itemKey, value);
    }
  };

  return (
    <div className="flex gap-4 border-b pb-4">
      {item.sourceUrl && (
        <img
          src={item.sourceUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md border shadow-sm"
        />
      )}
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800 uppercase">{item.name}</h3>
        {item.variation && item.variation.attributes?.nodes?.[0]?.value && (
          <p className="text-xs text-gray-600 capitalize leading-none">
            {item.variation.attributes.nodes[0].value}
          </p>
        )}
        <p className="text-gray-500 text-lg oswald mt-1">S/ {item.price.toFixed(2)}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center bg-gray-50 rounded-lg border">
            <button
              onClick={() => updateQuantity(itemKey, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="w-12 h-8 text-center bg-transparent border-none focus:ring-0 text-lg bebas"
              aria-label="Cantidad"
            />
            <button
              onClick={() => updateQuantity(itemKey, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeCartItem(itemKey)}
            className="ml-auto text-red-500 hover:text-red-600 transition-colors p-2"
            title="Eliminar"
            aria-label="Eliminar item"
          >
            <FaTrash />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          Subtotal: S/ {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
} 