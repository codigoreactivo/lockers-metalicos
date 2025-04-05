import { useRef, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { SwiperNavButtons } from '../Global/NavSwiperButton';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ProductCarouselItem from './ProductCarouselItem';
import ProductSaleLoading from '../../Skeletons/ProductSaleLoading';

// Importar CSS correctamente
import './ProductSale.css';

// GraphQL
import * as pkg from '@apollo/client';
const { useQuery } = pkg;
import { createSaleProductsQuery } from '../../../graphql/queryBuilders';
import { DEFAULT_PAGE_SIZE } from '../../../graphql/config';

// Interfaces para tipos
interface ProductImage {
  node?: {
    sourceUrl?: string;
    altText?: string;
  };
}

interface Product {
  id: string;
  name: string;
  regularPrice?: string;
  salePrice?: string;
  price?: string;
  featuredImage?: ProductImage;
}

interface QueryData {
  products?: {
    nodes?: Product[];
  };
}

// Creamos la query dinámicamente
const PRODUCT_SALE_QUERY = createSaleProductsQuery(DEFAULT_PAGE_SIZE.SALE_CAROUSEL);

const ProductSaleContent: React.FC = () => {
  const { loading, error, data } = useQuery<QueryData>(PRODUCT_SALE_QUERY, {
    fetchPolicy: 'network-only', // Evitar problemas de caché
    nextFetchPolicy: 'cache-first' // Usar la caché después de la primera carga
  });
  const progressCircle = useRef<SVGCircleElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const onAutoplayTimeLeft = (_s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // Si hay un error en la consulta
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">Error al cargar productos</p>
      </div>
    );
  }

  // Si está cargando, muestra el skeleton
  if (loading) {
    return <ProductSaleLoading />;
  }

  // Productos disponibles
  const products = data?.products?.nodes || [];

  // Log para depuración
  console.log(`ProductSale: Número de productos cargados: ${products.length}`);

  return (
    <div className="product-sale-container">
      <Swiper
        spaceBetween={30}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="carswiper relative h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperNavButtons />
        {products.length > 0 ? (
          products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCarouselItem product={product} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className='w-full h-full flex flex-col justify-center items-center p-6 text-center'>
              <p className='text-gray-600'>No hay productos en oferta disponibles</p>
            </div>
          </SwiperSlide>
        )}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48">
            <circle ref={progressCircle} cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default memo(ProductSaleContent); 