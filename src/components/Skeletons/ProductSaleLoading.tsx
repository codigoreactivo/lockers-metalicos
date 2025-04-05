import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductSaleLoading: React.FC = memo(() => (
  <div className="w-full h-full">
    <Swiper className="carswiper relative h-full">
      <SwiperSlide>
        <div className="w-full h-full animate-pulse">
          <div className="flex flex-col justify-between items-start pt-6 pb-4 px-6 h-full">
            {/* Skeleton para imagen */}
            <div className="w-full aspect-square bg-gray-200 rounded-xl border border-gray-300"></div>

            {/* Skeleton para contenido */}
            <div className="flex flex-col py-2 w-full gap-3">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
));

export default ProductSaleLoading;
