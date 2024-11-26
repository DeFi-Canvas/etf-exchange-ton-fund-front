import { Swiper, SwiperSlide } from 'swiper/react';
import * as E from 'fp-ts/Either';

import { FondCard, FondCardProps } from '../fond-card.component';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import 'swiper/css';

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

    return (
        <>
            <RenderResult
                data={slidesData}
                loading={() => (
                    <>
                        <SwiperSlide>
                            <SkeletonCard type={'medium'} />
                        </SwiperSlide>
                    </>
                )}
                success={(slideData) => (
                    <>
                        <Swiper {...swiperOptions} className={theme}>
                            {slideData.map((slideData) => (
                                <SwiperSlide key={slideData.title}>
                                    <FondCard
                                        {...slideData}
                                        onClick={onClick}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}
            />
        </>
    );
};
