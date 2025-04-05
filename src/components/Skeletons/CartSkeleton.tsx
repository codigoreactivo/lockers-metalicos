// Componente esqueleto para el carrito mientras carga
const CartSkeleton = () => {
    return (
        <div className="flex flex-col min-h-[70vh]">
            <div className="flex-1 p-4">
                <div className="animate-pulse space-y-6">
                    {/* Placeholder para los productos */}
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="flex gap-4 p-2 border-b pb-4">
                            <div className="w-16 h-16 bg-gray-200 rounded"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="flex justify-between">
                                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Placeholder para el resumen */}
            <div className="p-4 border-t">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton; 