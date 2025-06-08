import css from './what-inside.module.css';
import * as E from 'fp-ts/Either';
import { Link } from 'react-router-dom';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import { FundsData } from '@/instance/fund/fund.model';

interface WhatInsideProps {
    assets: E.Either<string, FundsData['assets']>;
    texts: {
        whatsInside: string;
    };
}

const WhatInside = ({ assets, texts }: WhatInsideProps) => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>{texts.whatsInside}</div>
            <div className={css.cardContent}>
                <RenderResult
                    data={assets}
                    loading={() => (
                        <>
                            <SkeletonCard type={'small'} />
                            <SkeletonCard type={'small'} />
                            <SkeletonCard type={'small'} />
                        </>
                    )}
                    success={(assets) => (
                        <>
                            {assets?.map((asset) => (
                                <Link key={asset.id} to={`/assets/${asset.id}`}>
                                    <div className={css.cardItem}>
                                        <img
                                            src={asset.imageUrl}
                                            className={css.cardItemImage}
                                        />
                                        <div className={css.cardContentInfo}>
                                            <div
                                                className={
                                                    css.cardContentInfoTitle
                                                }
                                            >
                                                {asset.ticker}
                                            </div>
                                            <div
                                                className={
                                                    css.cardContentInfoSubTitle
                                                }
                                            >
                                                {asset.name}
                                            </div>
                                        </div>
                                        <div
                                            className={css.cardContentInfoValue}
                                        >
                                            {asset.allocationPercentage}%
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default WhatInside;
