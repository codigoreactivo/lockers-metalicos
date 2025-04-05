import React, { memo } from 'react';
import { ProductFloatingCard } from '../../../Cards/Global/ProductFloatingCard';

interface ProductImage {
  node: {
    sourceUrl?: string;
    altText?: string;
  };
}

interface ProductProps {
  product: {
    id: string;
    name: string;
    regularPrice?: string;
    salePrice?: string;
    price?: string;
    slug?: string;
    link?: string;
    featuredImage?: ProductImage;
  };
}

// Imagen por defecto para casos donde no se carga la imagen principal
const DEFAULT_IMAGE = "/no-image.jpg";

const HeroSliderItem: React.FC<ProductProps> = memo(({ product }) => {
  // Extraer la URL de imagen de forma segura
  const imageUrl = product.featuredImage?.node?.sourceUrl || DEFAULT_IMAGE;
  // Extraer el texto alternativo de forma segura
  const imageAlt = product.featuredImage?.node?.altText || product.name || "Producto destacado";

  return (
    <div className='h-auto w-full rounded-lg flex flex-col lg:flex-row justify-center items-center'>
      <div className='flex flex-col xl:flex-row items-center justify-center text-xl'>
        <div className='flex flex-col text-center'>
          <h2>{product.name}</h2>
          <img
            src={imageUrl}
            alt={imageAlt}
            className='rounded-xl w-[460px] h-fit'
            loading="lazy"
            onError={(e) => {
              // Si la imagen falla, usar la imagen por defecto
              const target = e.target as HTMLImageElement;
              if (target.src !== DEFAULT_IMAGE) {
                target.src = DEFAULT_IMAGE;
              }
            }}
          />
        </div>
        <div className='oswald self-start xl:pr-[40px] w-full lg:w-fit'>
          <ProductFloatingCard
            product={{
              name: product.name,
              regularPrice: product.regularPrice,
              salePrice: product.salePrice,
              featuredImage: product.featuredImage,
              link: product.link
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default HeroSliderItem; 