import css from './news-earn.module.css';
import coinSmallBlurImage from './assets/coin-small-blur.png';
import coinBigImage from './assets/coin-big.png';
import { ChevronRightIcon } from '@/components/Icons/Icons';
import { Link } from 'react-router-dom';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

interface NewsEarnProps {
    title: string;
    subTitle: string;
}

export const NewsEarn = ({ title, subTitle }: NewsEarnProps) => {
    const eventBuilder = useTWAEvent();

    return (
        <div
            className={css.card}
            onClick={() => {
                trackTelemetree(
                    eventBuilder,
                    'WALLET_PAGE: "earn slide" click'
                );
            }}
        >
            <div className={css.content}>
                <span className={css.contentTitle}>{title}</span>
                <Link to={'/profile'} className={css.contentLink}>
                    {subTitle} <ChevronRightIcon size={16} />
                </Link>
            </div>
            <div className={css.imageWrapper}>
                <img src={coinSmallBlurImage} className={css.coinSmallBlur} />
                <img src={coinBigImage} className={css.coinBig} />
            </div>
        </div>
    );
};
