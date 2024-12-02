import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import 'swiper/css';
import {
    FondCardProps,
    FondCard,
} from '@/components/fond-card/fond-card.component';
import css from './funds.module.css';

export interface FondsSliderProps {
    funds: E.Either<string, Array<Omit<FondCardProps, 'onClick'>>>;
    onClick: (id: string) => void;
}

export const FondsWrap = ({ funds, onClick }: FondsSliderProps) => {
    return (
        <>
            <RenderResult
                data={funds}
                loading={() => (
                    <>
                        <SkeletonCard type={'medium'} />
                        <SkeletonCard type={'medium'} />
                        <SkeletonCard type={'medium'} />
                    </>
                )}
                success={(funds) => (
                    <div className={css.fundsWrap}>
                        {funds.map((fund) => (
                            <FondCard
                                key={fund.id}
                                {...fund}
                                onClick={onClick}
                            />
                        ))}
                    </div>
                )}
            />
        </>
    );
};
