import { Swiper, SwiperSlide } from 'swiper/react';

import { FondCard, FondCardProps } from '../fond-card.component';
import 'swiper/css';

export interface FondsSliderProps {
    theme?: string;
    slidesData: Array<Omit<FondCardProps, 'onClick'>>;
    onClick: (id: string) => void;
}

export const FondsSlider = ({
    theme,
    slidesData,
    onClick,
}: FondsSliderProps) => {
    const swiperOptions = {
        spaceBetween: 10,
        slidesPerView: 1.05,
    };

    return (
        <>
            <Swiper {...swiperOptions} className={theme}>
                {slidesData.map((slideData) => (
                    <SwiperSlide key={slideData.title}>
                        <FondCard {...slideData} onClick={onClick} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
