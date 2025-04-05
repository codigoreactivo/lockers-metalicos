import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { useSwiper } from 'swiper/react';

export const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="w-full h-full flex justify-between items-center px-2 gap-3 xl:gap-12  absolute top-0 ">
            <GoArrowLeft
                onClick={() => swiper.slidePrev()}
                className='text-white bg-black border-[1px] border-white/30 text-5xl lg:text-7xl p-2 lg:p-3 rounded-md cursor-pointer hover:bg-[#EBBC2A] hover:text-black transition-all ease-linear duration-300 z-10'
            />


            <GoArrowRight
                onClick={() => swiper.slideNext()}
                className='text-white bg-black border-[1px] border-white/30 text-5xl lg:text-7xl p-2 lg:p-3 rounded-md cursor-pointer hover:bg-[#EBBC2A] hover:text-black transition-all ease-linear duration-300 z-10'
            />

        </div>
    );
};
