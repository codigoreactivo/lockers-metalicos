import { persistentMap } from '@nanostores/persistent';
import { atom } from 'nanostores';

// Interfaces para los tipos de datos
interface CartItem {
  id: string;
  name: string;
  price: number;
  sourceUrl: string;
  quantity: number;
  variation?: {
    id: string;
    name: string;
    price: number;
  } | null;
}

interface CartItems {
  [key: string]: CartItem | undefined;
}

// Estado del carrito
export const isCartOpen = atom<boolean>(false);

// ID de la tienda (Local Storage)
export const storeId = 'fabrinsa-lockers-cart:';

// Carrito persistente con tipos
export const cartItems = persistentMap<CartItems>(storeId, {}, {
  encode: JSON.stringify,
  decode: JSON.parse
});

// Agregar item al carrito con tipos
export function addCartItem(item: CartItem): void {
  if (!item?.id || !item?.name || !item?.price) {
    console.warn('Invalid item:', item);
    return;
  }

  const cartId = item.variation?.id
    ? `${item.id}-${item.variation.id}`
    : item.id;

  const cartItem: CartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    sourceUrl: item.sourceUrl || '',
    quantity: item.quantity || 1,
    variation: item.variation || null
  };

  const currentCart = cartItems.get();
  const existingItem = currentCart[cartId];

  if (existingItem) {
    cartItems.setKey(cartId, {
      ...existingItem,
      quantity: existingItem.quantity + (item.quantity || 1)
    });
  } else {
    cartItems.setKey(cartId, cartItem);
  }
}

// Actualizar cantidad con tipos
export function updateQuantity(cartId: string, newQuantity: number): void {
  const items = cartItems.get();
  const item = items[cartId];

  if (item) {
    const quantity = parseInt(newQuantity.toString());
    if (quantity < 1) {
      removeCartItem(cartId);
    } else {
      cartItems.setKey(cartId, {
        ...item,
        quantity: quantity
      });
    }
  }
}

// Remover item con tipos
export function removeCartItem(cartId: string): void {
  cartItems.setKey(cartId, undefined);
}

// Verificar si hay items con tipos
export function hasItems(): boolean {
  try {
    const items = cartItems.get();
    const itemList = Object.values(items).filter((item): item is CartItem => Boolean(item));

    // Debug logs
    console.group('🛒 hasItems Check');
    console.log('Raw items:', items);
    console.log('Filtered items:', itemList);
    console.log('Items length:', itemList.length);
    console.groupEnd();

    return itemList.length > 0;
  } catch (error) {
    console.error('Error checking items:', error);
    return false;
  }
}

// Debug helper con tipos
export function debugCart(): void {
  console.group('🛒 Cart');

  const items = Object.values(cartItems.get()).filter((item): item is CartItem => Boolean(item));
  console.log('Items:', items);

  const total = items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );

  console.log('Total:', `S/ ${total.toFixed(2)}`);
  console.groupEnd();
}

// Exponer debug en desarrollo con tipos
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).debugCart = debugCart;
}
