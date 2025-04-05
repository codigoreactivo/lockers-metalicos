import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { cartItems } from '../../cartStore';
import CartList from './CartList';
import CartSummary from './CartSummary';
import CartEmpty from './CartList/CartEmpty';
import CartSkeleton from '../Skeletons/CartSkeleton';

export default function CartContainer() {
    const [mounted, setMounted] = useState(false);
    const items = useStore(cartItems);
    const hasItems = Object.values(items).filter(Boolean).length > 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Estado inicial consistente
    if (!mounted) {
        return <CartSkeleton />;
    }

    // Si no hay items, mostrar carrito vacío
    if (!hasItems) {
        return (
            <div className="container mx-auto px-4 py-8">
                <CartEmpty />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CartList />
                </div>
                <div className="lg:col-span-1">
                    <div className='sticky top-28'>
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
} 