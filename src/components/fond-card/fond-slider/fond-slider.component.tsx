import { Swiper, SwiperSlide } from 'swiper/react';

import { FondCard } from '../fond-card.component';
import 'swiper/css';

interface FondsSliderProps {
    theme?: string;
}

export const FondsSlider = ({ theme }: FondsSliderProps) => {
    const swiperOptions = {
        spaceBetween: 10,
        slidesPerView: 1.05,
    };

    return (
        <>
            <Swiper {...swiperOptions} className={theme}>
                <SwiperSlide>
                    <FondCard />
                </SwiperSlide>
                <SwiperSlide>
                    <FondCard />
                </SwiperSlide>
                <SwiperSlide>
                    <FondCard />
                </SwiperSlide>
                <SwiperSlide>
                    <FondCard />
                </SwiperSlide>
                <SwiperSlide>
                    <FondCard />
                </SwiperSlide>
            </Swiper>
        </>
    );
};
