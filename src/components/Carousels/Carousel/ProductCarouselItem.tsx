import React, { memo } from 'react';
import { WhatsAppBuyButtonReact } from '../../Cards/Global/Buttons/WhatsAppBuyButtonReact';
import AddToCartButton from '../../Cart/Buttons/AddToCart';

interface ProductImage {
  node?: {
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
    featuredImage?: ProductImage;
  };
}

const ProductCarouselItem: React.FC<ProductProps> = memo(({ product }) => {
  // Convertir precio a número para AddToCartButton
  const cartProduct = {
    ...product,
    price: product.price ? parseFloat(product.price) : 
           product.salePrice ? parseFloat(product.salePrice) : 0
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-start pt-6 pb-4 px-6'>
      <div className='w-full flex justify-center items-center relative border border-black/30 rounded-xl'>
        <img 
          className='w-full lg:w-full rounded-xl' 
          src={product.featuredImage?.node?.sourceUrl || ''} 
          alt={product.featuredImage?.node?.altText || product.name} 
        />
      </div>
      <div className='flex flex-col py-2 text-black gap-3'>
        <div>
          <h2 className="text-2xl uppercase font-semibold">{product.name}</h2>
        </div>
        <div className='oswald text-white'>
          <span>Antes: S/{product.regularPrice}</span>
          <p className='text-2xl font-semibold'>
            Ahora: <span className='text-black'>S/{product.salePrice}</span>
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full pt-4'>
        <AddToCartButton product={cartProduct} />
        <WhatsAppBuyButtonReact product={product} />
      </div>
    </div>
  );
});

export default ProductCarouselItem; 