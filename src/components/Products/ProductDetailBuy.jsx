import { useState, useEffect } from 'react';
import { addCartItem, isCartOpen } from '../../cartStore';
import { IoCartOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaTruck, FaWhatsapp } from 'react-icons/fa';

// Componente de precio del producto
const ProductPrice = ({ price, hasPrice, isLoading }) => {
    if (isLoading) {
        return (
            <div className="mb-4 animate-pulse">
                <div className="h-9 w-36 bg-gray-200 rounded"></div>
            </div>
        );
    }

    return (
        <div className="mb-4">
            {hasPrice ? (
                <div className="text-3xl font-bold oswald text-[#EBBC2A]">
                    S/ {parseFloat(price).toFixed(2)}
                </div>
            ) : (
                <div className="text-xl font-medium oswald text-gray-600">
                    Precio no disponible
                </div>
            )}
        </div>
    );
};

// Componente de variaciones del producto
const ProductVariations = ({ variations, selectedVariation, onSelect, getColorValue, isLoading }) => {
    if (isLoading) {
        return (
            <div className="mb-6 animate-pulse">
                <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                    <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                    <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                </div>
            </div>
        );
    }

    if (!variations.length) return null;

    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 oswald">Color:</h3>
            <div className="flex flex-wrap gap-3">
                {variations.map((variation) => {
                    const colorValue = getColorValue(variation.colorValue);
                    const isSelected = selectedVariation?.id === variation.id;
                    const isWhiteOrLight = colorValue.toLowerCase() === '#ffffff' || colorValue.toLowerCase() === '#f5f5dc';

                    return (
                        <button
                            key={variation.id}
                            className={`w-12 h-12 rounded-lg transition-all duration-200 flex flex-col items-center justify-center ${isSelected ? 'ring-2 ring-offset-2 ring-[#EBBC2A]' : ''}`}
                            style={{
                                backgroundColor: colorValue,
                                border: isWhiteOrLight ? '1px solid #e5e7eb' : 'none'
                            }}
                            title={variation.colorValue}
                            onClick={() => onSelect(variation)}
                            aria-label={`Seleccionar color ${variation.colorValue}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

// Componente de cantidad
const ProductQuantity = ({ quantity, onQuantityChange, onIncrement, onDecrement, currentPrice, isLoading }) => {
    if (isLoading) {
        return (
            <div className="mb-6 animate-pulse">
                <div className="h-6 w-28 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-40 bg-gray-200 rounded"></div>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 oswald">Cantidad:</h3>
            <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                        onClick={onDecrement}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={onQuantityChange}
                        className="w-14 text-center border-none focus:ring-0 focus:outline-none"
                    />
                    <button
                        onClick={onIncrement}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition"
                    >
                        +
                    </button>
                </div>

                {currentPrice > 0 && (
                    <div className="text-lg font-medium text-gray-700 ml-4">
                        Total: <span className="text-[#EBBC2A]">S/ {(currentPrice * quantity).toFixed(2)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente de botones de acción
const ActionButtons = ({ hasPrice, onAddToCart, productName, isLoading }) => {
    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>
        );
    }

    const whatsappNumber = '51999888777'; // Reemplazar con el número real

    return (
        <div className="space-y-3">
            {hasPrice ? (
                <button
                    onClick={onAddToCart}
                    className="w-full bg-black text-white py-3 rounded-lg oswald text-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <IoCartOutline className="text-2xl" />
                    AGREGAR AL <span className="text-[#EBBC2A]">CARRITO</span>
                </button>
            ) : (
                <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola, estoy interesado en: ${productName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3 rounded-lg oswald text-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                    <FaWhatsapp className="text-2xl" />
                    CONSULTAR POR WHATSAPP
                </a>
            )}
        </div>
    );
};

export default function ProductDetailBuy({ product }) {
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Función simple para extraer precio numérico
    const getNumericPrice = (price) => {
        if (!price) return 0;
        if (typeof price === 'number') return price;
        const cleaned = price.toString().replace(/[^\d.]/g, '');
        return parseFloat(cleaned) || 0;
    };

    // Mapeo de colores a hexadecimal
    const colorMap = {
        'negro': '#000000',
        'blanco': '#FFFFFF',
        'gris': '#808080',
        'plata': '#C0C0C0',
        'azul': '#0000FF',
        'rojo': '#FF0000',
        'verde': '#008000',
        'amarillo': '#FFFF00',
        'marron': '#8B4513',
        'beige': '#F5F5DC',
    };

    // Obtener el valor de color en hexadecimal
    const getColorValue = (colorName) => {
        if (!colorName) return '#CCCCCC';
        return colorMap[colorName.toLowerCase()] || colorName;
    };

    // Procesar las variaciones del producto
    const getUniqueVariations = () => {
        if (!product?.variations?.nodes) return [];

        const variations = [];
        product.variations.nodes.forEach(variation => {
            const variationPrice = getNumericPrice(variation.price);
            if (variationPrice <= 0) return;

            const colorAttribute = variation.attributes?.nodes?.find(attr =>
                attr.name?.toLowerCase() === 'color' || attr.label?.toLowerCase() === 'color'
            );

            if (colorAttribute?.value) {
                variations.push({
                    ...variation,
                    colorValue: colorAttribute.value,
                    numericPrice: variationPrice
                });
            }
        });

        return variations;
    };

    // Función para asignar precios por defecto según el producto (temporal)
    const getProductDefaultPrice = (product) => {
        const productPriceMap = {
            'Caja fuerte buzon FBS-65': 2900,
            'Caja fuerte digital FBS-36EDII': 1500,
            'Caja fuerte para laptop FBS-49ED': 2200,
            'Caja fuerte de empotrar digital FBS-49ES': 2500,
            'Caja fuerte de piso FBS-43PD': 3000
        };

        return productPriceMap[product.name] || 2000;
    };

    // Inicializar producto al cargar
    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            // Verificar si tiene variaciones
            const variations = getUniqueVariations();

            if (variations.length > 0) {
                // Producto con variaciones - usar la primera
                const firstVariation = variations[0];
                setSelectedVariation(firstVariation);
                setCurrentPrice(firstVariation.numericPrice);
            } else {
                // Producto simple - buscar el mejor precio
                // SOLUCIÓN TEMPORAL para productos sin precio
                if (!product.price && !product.salePrice && !product.regularPrice) {
                    setCurrentPrice(getProductDefaultPrice(product));
                    setIsLoading(false);
                    return;
                }

                let bestPrice = 0;

                // Intentar con salePrice
                if (product.salePrice) {
                    bestPrice = getNumericPrice(product.salePrice);
                }

                // Si no hay salePrice válido, usar price
                if (bestPrice <= 0 && product.price) {
                    bestPrice = getNumericPrice(product.price);
                }

                // Finalmente probar regularPrice
                if (bestPrice <= 0 && product.regularPrice) {
                    bestPrice = getNumericPrice(product.regularPrice);
                }

                setCurrentPrice(bestPrice);
            }

            setIsLoading(false);
        }, 500); // Pequeño delay para mostrar el skeleton
    }, [product]);

    const handleVariationSelect = (variation) => {
        setSelectedVariation(variation);
        setCurrentPrice(variation.numericPrice);
        setError('');
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        // Verificar variación seleccionada si hay variaciones
        if (getUniqueVariations().length > 0 && !selectedVariation) {
            setError('Por favor selecciona un color');
            return;
        }

        // Verificar precio válido
        if (currentPrice <= 0) {
            setError('Producto sin precio válido');
            return;
        }

        // Obtener URL de la imagen para el carrito
        let imageUrl = '';
        if (selectedVariation?.featuredImage?.node?.sourceUrl) {
            imageUrl = selectedVariation.featuredImage.node.sourceUrl;
        } else if (product?.featuredImage?.node?.sourceUrl) {
            imageUrl = product.featuredImage.node.sourceUrl;
        }

        // Crear el objeto cartItem con la estructura correcta para cartStore.ts
        const cartItem = {
            id: product.id,
            name: product.name,
            price: currentPrice,
            quantity: quantity,
            sourceUrl: imageUrl,
        };

        if (selectedVariation) {
            cartItem.variation = selectedVariation;
        }

        isCartOpen.set(true);
        addCartItem(cartItem);
        setError('');
    };

    // Verificar si hay precio válido
    const hasPrice = currentPrice > 0;
    const uniqueVariations = getUniqueVariations();

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold oswald text-gray-800">Precio:</h2>
                <ProductPrice
                    price={currentPrice}
                    hasPrice={hasPrice}
                    isLoading={isLoading}
                />

                <ProductVariations
                    variations={uniqueVariations}
                    selectedVariation={selectedVariation}
                    onSelect={handleVariationSelect}
                    getColorValue={getColorValue}
                    isLoading={isLoading}
                />

                <ProductQuantity
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    onIncrement={incrementQuantity}
                    onDecrement={decrementQuantity}
                    currentPrice={currentPrice}
                    isLoading={isLoading}
                />

                {/* Mensaje de error */}
                {error && (
                    <div className="text-red-500 text-sm font-medium py-2">
                        {error}
                    </div>
                )}

                <ActionButtons
                    hasPrice={hasPrice}
                    onAddToCart={handleAddToCart}
                    productName={product.name}
                    isLoading={isLoading}
                />

            </div>
        </div>
    );
} 