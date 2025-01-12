import { FeeIcon, RiskLowIcon } from '@/components/Icons/Icons';
import css from './about.module.css';
import { FundsData } from '@/pages/whalet/whalet.model';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonLine from '@/components/skeletons/components/skeleton-line/skeleton-line.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import { getUuid } from '@/utils/uuid';

interface ChartAboutProps {
    fund: E.Either<string, FundsData>;
}

const About = ({ fund }: ChartAboutProps) => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>About</div>
            <RenderResult
                data={fund}
                loading={() => (
                    <div className={css.cardContentLoading}>
                        {new Array(6).fill(null).map(() => (
                            <SkeletonLine key={getUuid()} />
                        ))}
                        <SkeletonCard type={'small'} />
                        <SkeletonCard type={'small'} />
                    </div>
                )}
                success={({ description, managementFee: fee }) => (
                    <>
                        <div className={css.cardContent}>{description}</div>
                        <div className={css.cardInfoWrapper}>
                            <div className={css.cardInfoItem}>
                                <RiskLowIcon className={css.icon} />
                                <div className={css.cardInfoItemContent}>
                                    <div className={css.cardInfoTitle}>
                                        Low risk
                                    </div>
                                    <div className={css.cardInfoSubTitle}>
                                        Compared to meme coins
                                    </div>
                                </div>
                            </div>
                            <div className={css.cardInfoItem}>
                                <FeeIcon className={css.icon} />
                                <div className={css.cardInfoItemContent}>
                                    <div className={css.cardInfoTitle}>
                                        Commission {fee}%
                                    </div>
                                    <div className={css.cardInfoSubTitle}>
                                        Coins exchange fee
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
    );
};

export default About;
