import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { cartItems } from '../../cartStore';
import { useCheckout } from '../../hooks/useCheckout';
import CheckoutSummary from './CheckoutSummary';
import CheckoutForm from './CheckoutForm';

export default function CheckoutContainer() {
    const items = useStore(cartItems);
    const { isSubmitting, error, handleSubmit } = useCheckout();
    const [formError, setFormError] = useState<string | null>(null);
    const hasItems = Object.values(items).filter(Boolean).length > 0;

    // Limpiar el error después de 5 segundos
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setFormError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Actualizar el error del formulario cuando cambia el error del hook
    useEffect(() => {
        setFormError(error);
    }, [error]);

    useEffect(() => {
        if (!hasItems) {
            window.location.href = '/carrito';
        }
    }, [hasItems]);

    if (!hasItems) return null;

    const onSubmit = async (formData: any): Promise<boolean> => {
        try {
            console.log('Enviando formulario con datos:', formData);
            setFormError(null);

            const success = await handleSubmit(formData, items);
            console.log('Resultado del envío del formulario:', success);

            if (success) {
                window.location.href = "/gracias";
            }

            return !!success;
        } catch (err) {
            console.error('Error en onSubmit de CheckoutContainer:', err);
            setFormError(
                err instanceof Error ? err.message : "Error al procesar tu pedido"
            );
            return false;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 bebas">Confirmar Pedido</h1>

            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                    <div>
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{formError}</span>
                    </div>
                    <button
                        className="font-bold text-xl"
                        onClick={() => setFormError(null)}
                    >
                        &times;
                    </button>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CheckoutForm
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
                <div className="lg:col-span-1">
                    <CheckoutSummary />
                </div>
            </div>
        </div>
    );
} 