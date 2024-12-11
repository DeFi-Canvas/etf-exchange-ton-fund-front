import { FundsData } from '@/pages/whalet/whalet.model';
import css from './what-inside.module.css';
import { Link } from 'react-router-dom';

interface WhatInsideProps {
    assets: FundsData;
}

const WhatInside = ({ assets }: WhatInsideProps) => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>What&apos;s inside</div>
            <div className={css.cardContent}>
                {assets.assets?.map((asset) => (
                    <Link key={asset.id} to={`/assets/${asset.id}`}>
                        <div className={css.cardItem}>
                            <img
                                src={asset.logo}
                                className={css.cardItemImage}
                            />
                            <div className={css.cardContentInfo}>
                                <div className={css.cardContentInfoTitle}>
                                    {asset.symbol}
                                </div>
                                <div className={css.cardContentInfoSubTitle}>
                                    {asset.name}
                                </div>
                            </div>
                            <div className={css.cardContentInfoValue}>
                                {asset.allocationPercentage}%
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default WhatInside;
