import { useState } from 'react';
import { ProductFloatingCard } from './ProductFloatingCard';

interface ProductCardToggleProps {
  product: {
    name: string;
    regularPrice?: string;
    salePrice?: string;
    link?: string;
    featuredImage?: {
      node?: {
        sourceUrl?: string;
        altText?: string;
      };
    };
  };
  className?: string;
}

export const ProductCardToggle: React.FC<ProductCardToggleProps> = ({
  product,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col xl:flex-row items-center justify-center text-xl relative ${className}`}>
      {/* Imagen del producto */}
      <div className="flex flex-col text-center">
        <figure>
          {product.featuredImage?.node?.sourceUrl ? (
            <img
              src={product.featuredImage.node.sourceUrl}
              alt={product.featuredImage.node.altText || product.name}
              className="rounded-lg border border-black/10 w-auto h-fit"
            />
          ) : (
            <div className="aspect-square bg-slate-500 rounded-xl">
              <p>No image available</p>
            </div>
          )}
        </figure>
      </div>

      {/* Botón y Card flotante */}
      <div className="w-full h-full flex flex-col justify-center items-center absolute oswald">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black absolute top-4 right-4 text-[#EBBC2A] rounded-md p-2 text-base font-medium uppercase self-end hover:bg-[#EBBC2A] hover:text-black transition-all duration-300 ease-linear"
        >
          {isOpen ? 'Cerrar' : 'Ver más'}
        </button>

        {/* Card flotante con animación */}
        <div
          className={`
            transform transition-all duration-300 ease-in-out
            ${isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
            }
          `}
        >
          <ProductFloatingCard product={product} />
        </div>
      </div>
    </div>
  );
}; 