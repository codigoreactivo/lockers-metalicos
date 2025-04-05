import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const HeroSliderLoading: React.FC = memo(() => (
  <div className="w-full">
    <Swiper>
      <SwiperSlide>
        <div className="w-full animate-pulse">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 p-4">
            <div className="flex flex-col items-center w-full lg:w-1/2">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
              <div className="aspect-[4/3] w-full max-w-[460px] bg-gray-200 rounded-xl"></div>
            </div>
            <div className="oswald self-start w-full lg:w-fit">
              <div className="flex flex-col bg-gray-200 w-full md:max-w-60 md:min-w-56 p-2 rounded-lg gap-2">
                <div className="flex justify-between my-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="mt-2">
                  <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 w-28 bg-gray-300 rounded mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
));

export default HeroSliderLoading;
