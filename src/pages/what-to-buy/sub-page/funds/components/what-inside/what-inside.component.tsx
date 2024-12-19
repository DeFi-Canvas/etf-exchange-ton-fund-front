import { FundsData } from '@/pages/whalet/whalet.model';
import css from './what-inside.module.css';
import * as E from 'fp-ts/Either';
import { Link } from 'react-router-dom';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';

interface WhatInsideProps {
    assets: E.Either<string, FundsData['assets']>;
}

const WhatInside = ({ assets }: WhatInsideProps) => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>What&apos;s inside</div>
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
                                            src={asset.logo}
                                            className={css.cardItemImage}
                                        />
                                        <div className={css.cardContentInfo}>
                                            <div
                                                className={
                                                    css.cardContentInfoTitle
                                                }
                                            >
                                                {asset.symbol}
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
