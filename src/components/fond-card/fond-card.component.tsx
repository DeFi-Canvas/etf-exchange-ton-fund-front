import { CSSProperties } from 'react';
import css from './fond-card.module.css';
import cn from 'classnames';

import img from './temp/1.png';
import img2 from './temp/2.jpg';
import img3 from './temp/Frame 260862772 1.png';
import { RiskIcon } from '@/components/Icons/Icons.tsx';

type CustomCSSProperties = CSSProperties & {
    '--background-url'?: string;
};

// остальных данных тупо нет:(
export interface FondCardProps {
    id: string;
    title: string;
    description: string;
    onClick: (id: string) => void;
}

export const FondCard = ({
    title,
    description,
    id,
    onClick,
}: FondCardProps) => {
    const style: CustomCSSProperties = {
        '--background-url': `url(${img2})`,
    };

    const heandleClick = () => {
        onClick(id);
    };
    return (
        <div className={css.wrap} onClick={heandleClick}>
            <div className={css.statisticInfo} style={style}>
                <div className={cn(css.riskInfo, css.isolateOverlay)}>
                    <div className={css.risk}>
                        Risk
                        <RiskIcon />
                    </div>
                    <div className={css.coinWrap}>
                        <img src={img} alt="" className={css.img} />
                        <img src={img} alt="" className={css.img} />
                    </div>
                </div>
                <div className={cn(css.prediction, css.isolateOverlay)}>
                    <span>Forecast</span>
                    <span>5% Annual Return</span>
                </div>
            </div>
            <div className={css.mainInfo}>
                <div className={css.info}>
                    <span className={css.title}>{title}</span>
                    <div className={cn('trim-lines-1', css.description)}>
                        {description}
                    </div>
                </div>
                <div className={css.owner}>
                    <img src={img3} alt="" className={css.ownerLogo} />
                    <div className={css.ownerInfo}>
                        <span>Defi Canvas</span>
                        <span className={css.ownerDescription}>
                            Investing since 2018
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
