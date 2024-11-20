import { CSSProperties } from 'react';
import css from './fond-card.module.css';
import cn from 'classnames';

import img from './temp/1.png';
import img2 from './temp/2.jpg';
import img3 from './temp/Frame 260862772 1.png';

type CustomCSSProperties = CSSProperties & {
    '--backgroundUrl'?: string;
};

export const FondCard = () => {
    const style: CustomCSSProperties = {
        '--backgroundUrl': `url(${img2})`,
    };
    return (
        <div className={css.wrap}>
            <div className={css.statisticInfo} style={style}>
                <div className={css.riskInfo}>
                    <div className={css.risk}>
                        Risk
                        <span>1</span>
                    </div>
                    <div className={css.coinWrap}>
                        <img src={img} alt="" className={css.img} />
                        <img src={img} alt="" className={css.img} />
                    </div>
                </div>
                <div className={css.prediction}>
                    <span>Forecast</span>
                    <span>5% Annual Return</span>
                </div>
            </div>
            <div className={css.mainInfo}>
                <div className={css.info}>
                    <span className={css.title}>Stablecoin Yield Fund</span>
                    <div className={cn('trim-line', css.description)}>
                        A fund that generates returns using stablecoins by
                        leveraging
                    </div>
                </div>
                <div className={css.owner}>
                    <img src={img3} alt="" className={css.ownerLogo} />
                    <div className={css.ownerInfo}>
                        <span className={css.ownerTitle}>Defi Canvas</span>
                        <span className={css.ownerDescription}>
                            Investing since 2018
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
