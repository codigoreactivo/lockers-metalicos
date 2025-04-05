import { useRef, useEffect, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { SwiperNavButtons } from '../../Global/NavSwiperButton';
import HeroSliderItem from './HeroSliderItem';
import HeroSliderLoading from '../../../Skeletons/HeroSliderLoading';

import './HeroSlider.css';

// GraphQL
import * as pkg from '@apollo/client';
const { useQuery } = pkg;
import { createFeaturedProductsQuery } from '../../../../graphql/queryBuilders';
import { DEFAULT_PAGE_SIZE, FEATURED_PRODUCT_IDS } from '../../../../graphql/config';

// Interfaces para tipos
interface ProductImage {
  node: {
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
  slug?: string;
  link?: string;
  featuredImage?: ProductImage;
}

interface QueryData {
  products?: {
    nodes?: Product[];
  };
}

// Configuración para el swiper
const swiperConfig = {
  spaceBetween: 30,
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    clickable: true,
  },
  navigation: true,
  modules: [Autoplay, Pagination, Navigation],
  className: "mySwiper hero-swiper relative",
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 1 },
    1024: { slidesPerView: 1 },
  }
};

// Crear una consulta para productos destacados usando los IDs de configuración
const HERO_SLIDER_QUERY = createFeaturedProductsQuery(FEATURED_PRODUCT_IDS, DEFAULT_PAGE_SIZE.SLIDERS);

const HeroSliderContent: React.FC = () => {
  const progressCircle = useRef<SVGCircleElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const { loading, error, data } = useQuery<QueryData>(HERO_SLIDER_QUERY, {
    fetchPolicy: 'network-only', // Evitar problemas de caché
    nextFetchPolicy: 'cache-first', // Usar la caché después de la primera carga
    context: {
      clientName: 'heroSlider' // Identificador único para esta consulta
    }
  });

  useEffect(() => {
    if (error) {
      console.error('Error en la consulta del slider principal:', error);
    }
  }, [error]);

  const onAutoplayTimeLeft = (_s: SwiperType, time: number, progress: number) => {
    if (!progressCircle.current || !progressContent.current) return;
    progressCircle.current.style.setProperty('--progress', String(1 - progress));
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // Si está cargando, muestra el skeleton
  if (loading) {
    return <HeroSliderLoading />;
  }

  // Si hay error, muestra el mensaje
  if (error) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <p className="text-red-500">Error al cargar productos destacados</p>
      </div>
    );
  }

  // Productos disponibles
  const products = data?.products?.nodes || [];

  // Si no hay productos
  if (products.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <p className="text-gray-500">No hay productos destacados disponibles</p>
      </div>
    );
  }

  return (
    <div className="hero-slider-container">
      <Swiper
        {...swiperConfig}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperNavButtons />
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <HeroSliderItem product={product} />
          </SwiperSlide>
        ))}
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

export default memo(HeroSliderContent); 