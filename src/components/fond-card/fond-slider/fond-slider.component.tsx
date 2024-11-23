import { Swiper, SwiperSlide } from 'swiper/react';
import * as E from 'fp-ts/Either';

import { FondCard, FondCardProps } from '../fond-card.component';
import 'swiper/css';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import { pipe } from 'fp-ts/lib/function';

export interface FondsSliderProps {
    theme?: string;
    slidesData: E.Either<string, Array<Omit<FondCardProps, 'onClick'>>>;
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

    const Slides = pipe(
        slidesData,
        E.fold(
            () => (
                <>
                    <SwiperSlide>
                        <SkeletonCard type={'medium'} />
                    </SwiperSlide>
                </>
            ),
            (slideData) => {
                return (
                    <>
                        {slideData.map((slideData) => (
                            <SwiperSlide key={slideData.title}>
                                <FondCard {...slideData} onClick={onClick} />
                            </SwiperSlide>
                        ))}
                    </>
                );
            }
        )
    );

    return (
        <>
            <Swiper {...swiperOptions} className={theme}>
                {/* TODO: почему криво работает с  RenderResult я хз*/}
                {Slides}
            </Swiper>
        </>
    );
};
