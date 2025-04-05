import { useStore } from '@nanostores/react';
import { IoCartOutline } from 'react-icons/io5';
import { cartItems } from '../../cartStore';

export function CartIcon() {
    const items = useStore(cartItems);
    const itemCount = Object.values(items)
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative">
            <IoCartOutline size={24} className="text-[#0C43AC]" />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                    {itemCount}
                </span>
            )}
        </div>
    );
} 