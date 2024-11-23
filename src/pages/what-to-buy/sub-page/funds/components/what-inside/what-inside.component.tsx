import { FundsData } from '@/pages/what-to-buy/what-to-buy.model';
import css from './what-inside.module.css';

interface WhatInsideProps {
    assets: FundsData;
}

const WhatInside = ({ assets }: WhatInsideProps) => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>What&apos;s inside</div>
            <div className={css.cardContent}>
                {assets.assets?.map((asset) => (
                    <div className={css.cardItem} key={asset.asset.name}>
                        <img
                            src={asset.asset.logo}
                            className={css.cardItemImage}
                        />
                        <div className={css.cardContentInfo}>
                            <div className={css.cardContentInfoTitle}>
                                {asset.asset.symbol}
                            </div>
                            <div className={css.cardContentInfoSubTitle}>
                                {asset.asset.name}
                            </div>
                        </div>
                        <div className={css.cardContentInfoValue}>
                            {asset.asset.allocationPercentage}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatInside;
