import { WhatsAppBuyButtonReact } from './Buttons/WhatsAppBuyButtonReact';
import AddToCartButton from '../../Cart/Buttons/AddToCart';

interface ProductFloatingCardProps {
  product: {
    name: string;
    regularPrice?: string;
    salePrice?: string;
    link?: string;
    id?: string;
    featuredImage?: {
      node?: {
        sourceUrl?: string;
      };
    };
  };
  className?: string;
}

export const ProductFloatingCard: React.FC<ProductFloatingCardProps> = ({
  product,
  className = ""
}) => {
  // Preparar datos para el carrito siguiendo la lógica de ProductCard.astro
  const cartProductData = {
    id: product?.id || `product-${product.name.replace(/\s+/g, '-').toLowerCase()}`,
    name: product?.name || "",
    price: parseFloat((product?.salePrice || "0").replace(/[^\d.]/g, '')),
    featuredImage: {
      node: {
        sourceUrl: product?.featuredImage?.node?.sourceUrl || "",
      },
    },
  };

  // Preparar datos para WhatsApp
  const whatsappProductData = {
    name: product?.name || "",
    price: product?.salePrice || "",
  };

  return (
    <div className={`flex flex-col bg-[#303330] w-full md:max-w-60 md:min-w-56 text-white p-2 rounded-lg gap-2 shadow-xl ${className}`}>
      <div className='flex justify-between my-2'>
        <p className='text-[#EBBC2A]'>¡Oferta!</p>
        <span>-10%</span>
      </div>

      <h2 className='text-xl uppercase leading-none'>{product.name}</h2>

      <div className='mt-2'>
        {product.regularPrice && product.salePrice ? (
          <>
            <p className='text-sm font-light leading-none text-[#A6A6A6]'>
              Antes: <span className='line-through'> S/{product.regularPrice}</span>
            </p>
            <p className='text-xl font-semibold'>
              Ahora: <span className='text-[#EBBC2A]'> S/{product.salePrice}</span>
            </p>
          </>
        ) : (
          <p className='text-xl font-light oswald text-[#EBBC2A]'>
            Precio no disponible
          </p>
        )}
      </div>

      <WhatsAppBuyButtonReact product={whatsappProductData} />
      <AddToCartButton product={cartProductData} />
    </div>
  );
}; 