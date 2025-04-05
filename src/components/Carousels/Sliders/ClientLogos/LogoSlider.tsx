// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay'; // Asegúrate de importar también el CSS para el módulo Autoplay
import './LogoSlider.css';
// import required modules
import { Autoplay, FreeMode } from 'swiper/modules';

export default function App() {
    const imagePaths = [
        '/logos/sunat.png',
        '/logos/geo.png',
        '/logos/icpna.png',
        '/logos/mrg.png',
        '/logos/cbc.png',
        '/logos/consorciowi.jpg',
        '/logos/mrg.png',
        '/logos/vicus.jpg',
        '/logos/sunat.png',
        '/logos/geo.png',
        '/logos/icpna.png',
        '/logos/mrg.png',
        '/logos/cbc.png',
        '/logos/consorciowi.jpg',
        '/logos/mrg.png',
        '/logos/vicus.jpg',
    ];

    const images = imagePaths.map((path, index) => (
        <SwiperSlide key={index} id='logoSlider' >
            <img
                src={path}
                width={200}
                height={100}
                alt={`Image ${index + 1}`}
                className="lg:w-[180px] w-28 h-full"
            />
        </SwiperSlide>
    ));

    return (
        <div className="relative overflow-hidden">


            <Swiper
                speed={2000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                loop={true}
                freeMode={true}
                slidesPerView={'auto'}
                spaceBetween={50}
                centeredSlides={false}
                modules={[Autoplay, FreeMode]}
                className="logo-infite-slider"
            >
                {images}
            </Swiper>
        </div>
    );
}
