// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay'; // Asegúrate de importar también el CSS para el módulo Autoplay
import './MarqueeTop.css';
// import required modules
import { Autoplay, FreeMode } from 'swiper/modules';

export default function App() {
    const contactInfo = [
        {
            type: 'phone',
            numbers: ['978820017', '993094770', '978820014'],
            icon: '📞'
        },
        {
            type: 'email',
            value: 'ventas@fabrinsaperu.com',
            icon: '✉️'
        },
        {
            type: 'whatsapp',
            numbers: ['978820017', '993094770', '978820014'],
            icon: '💬'
        }
    ];

    const createContactElements = () => {
        const elements = [];
        
        // Repetimos 4 veces para mantener el efecto de marquee
        for (let i = 0; i < 4; i++) {
            contactInfo.forEach((info, index) => {
                if (info.type === 'phone') {
                    elements.push(
                        <SwiperSlide key={`phone-${i}-${index}`}>
                            <div className="flex items-center gap-2">
                                <span>{info.icon}</span>
                                <div className="flex gap-2">
                                    {info.numbers.map((num, idx) => (
                                        <a
                                            key={idx}
                                            href={`tel:+51${num}`}
                                            className="hover:text-blue-500 transition-colors duration-300"
                                            onClick={() => {
                                                // Puedes agregar aquí tu código de analytics
                                                console.log(`Llamada al número: ${num}`);
                                            }}
                                        >
                                            {num}
                                            {idx < info.numbers.length - 1 && " - "}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                } else if (info.type === 'email') {
                    elements.push(
                        <SwiperSlide key={`email-${i}-${index}`}>
                            <div className="flex items-center gap-2">
                                <span>{info.icon}</span>
                                <a
                                    href={`mailto:${info.value}`}
                                    className="hover:text-blue-500 transition-colors duration-300"
                                    onClick={() => {
                                        console.log(`Click en email: ${info.value}`);
                                    }}
                                >
                                    {info.value}
                                </a>
                            </div>
                        </SwiperSlide>
                    );
                } else if (info.type === 'whatsapp') {
                    elements.push(
                        <SwiperSlide key={`whatsapp-${i}-${index}`}>
                            <div className="flex items-center gap-2">
                                <span>{info.icon}</span>
                                <div className="flex gap-2">
                                    {info.numbers.map((num, idx) => (
                                        <a
                                            key={idx}
                                            href={`https://wa.me/51${num}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-green-500 transition-colors duration-300"
                                            onClick={() => {
                                                console.log(`Click en WhatsApp: ${num}`);
                                            }}
                                        >
                                            {num}
                                            {idx < info.numbers.length - 1 && " - "}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                }
            });
        }
        return elements;
    };

    return (
        <Swiper
            speed={6000}
            freeMode={true}
            grabCursor={true}
            autoplay={{
                delay: 0.5,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={'auto'}
            spaceBetween={40}
            modules={[Autoplay, FreeMode]}
            className="text-infite-slider"
        >
            {createContactElements()}
        </Swiper>
    );
}