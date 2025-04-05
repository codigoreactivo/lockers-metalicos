import { addCartItem, isCartOpen } from '../../../cartStore';
import { useState, useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";

// Interfaces para los tipos de datos
interface ProductAttribute {
  value: string;
  label: string;
}

interface ProductVariation {
  id: string;
  price: number;
  regularPrice?: number;
  attributes?: {
    nodes?: ProductAttribute[];
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  variations?: {
    nodes?: ProductVariation[];
  };
}

interface CartItemVariation {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  attributes: {
    nodes: {
      value: string;
      label: string;
    }[];
  };
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  sourceUrl: string;
  quantity: number;
  variation?: CartItemVariation;
}

interface AddToCartFormProps {
  product: Product;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  // Establecer la primera variación por defecto si existe
  useEffect(() => {
    if (product?.variations?.nodes && product.variations.nodes.length > 0) {
      const firstVariation = product.variations.nodes[0];
      setSelectedVariation(firstVariation);
    }
  }, [product]);

  const handleAddToCart = () => {
    const id = product.id;
    // Convertir los precios a número para cálculos
    const price = product.price; // Usamos price en lugar de currentPrice

    if (!price && !selectedVariation?.price) return;

    const cartItem: CartItem = {
      id: id,
      name: product.name,
      price: selectedVariation?.price || price,
      sourceUrl: product.featuredImage?.node?.sourceUrl || '',
      quantity: 1
    };

    if (selectedVariation) {
      cartItem.variation = {
        id: selectedVariation.id,
        name: `${product.name} - ${selectedVariation.attributes?.nodes?.[0]?.value || ''}`,
        price: selectedVariation.price,
        regularPrice: selectedVariation.regularPrice || selectedVariation.price,
        attributes: {
          nodes: selectedVariation.attributes?.nodes?.map(attr => ({
            value: attr.value,
            label: attr.label
          })) || []
        }
      };
    }

    isCartOpen.set(true);
    addCartItem(cartItem);
  };

  // Función para obtener el color en formato CSS
  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
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
      // Agrega más colores según necesites
    };
    return colorMap[colorName.toLowerCase()] || colorName;
  };

  return (
    <div className="flex flex-col w-full">
      { /*
      <div className="text-3xl text-[#0C43AC] mt-3 mb-1 font-bold oswald uppercase leading-[0]">
        S/ {currentPrice.toFixed(2)}
      </div>
      */}
      {product?.variations?.nodes && product.variations.nodes.length > 0 && (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">Color:</span>
          <div className="flex flex-wrap gap-2">
            {product.variations.nodes.map((variation) => {
              const colorValue = variation.attributes?.nodes?.[0]?.value || '';
              const backgroundColor = getColorValue(colorValue);
              const isWhiteOrLight = backgroundColor.toLowerCase() === '#ffffff' || backgroundColor.toLowerCase() === '#f5f5dc';

              return (
                <div
                  key={`variation-${variation.id}`}
                  className="flex flex-col items-center"
                >
                  <button
                    key={`button-${variation.id}`}
                    onClick={() => {
                      setSelectedVariation(variation);
                    }}
                    className={`w-8 h-8 rounded-md transition-all duration-200 ${selectedVariation?.id === variation.id
                      ? 'ring-2 ring-offset-2 ring-[#0C43AC]'
                      : ''
                      }`}
                    style={{
                      backgroundColor: backgroundColor,
                      border: isWhiteOrLight ? '1px solid #e5e7eb' : 'none'
                    }}
                    title={colorValue}
                    aria-label={`Seleccionar color ${colorValue}`}
                  />
                  <span
                    key={`label-${variation.id}`}
                    className="text-xs mt-1 capitalize"
                  >
                    {colorValue}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="bg-black flex items-center justify-center gap-2 add-to-cart oswald uppercase text-white p-3 text-xs lg:text-base font-medium w-full border border-black hover:bg-transparent hover:text-black hover:bg-white transition duration-300 ease-in-out rounded-md group break-words"
        aria-label="Agregar al carrito"
      >
        <IoCartOutline className="mr-2 text-3xl lg:text-2xl" />
        <p> Agregar al <span className='text-[#EBBC2A] group-hover:text-black transition duration-300 ease-in-out'>Carrito</span></p>
      </button>
    </div>
  );
}
