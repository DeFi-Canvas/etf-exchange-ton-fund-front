import css from './lern-more.module.css';
import bookImage from './assets/book.png';
import { ChevronRightIcon } from '@/components/Icons/Icons';
import { Link } from 'react-router-dom';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

interface LernMore {
    title: string;
    subTitle: string;
}

export const LernMore = ({ title, subTitle }: LernMore) => {
    const eventBuilder = useTWAEvent();

    return (
        <div
            className={css.card}
            onClick={() => {
                trackTelemetree(
                    eventBuilder,
                    'WALLET_PAGE: "lern more" slide click'
                );
            }}
        >
            <div className={css.content}>
                <span className={css.contentTitle}>{title}</span>
                <Link
                    to={
                        'https://holstby.github.io/etf-exchange-ton-fund-gitbook/docs/introduction.html'
                    }
                    target="_blank"
                    rel="noreferrer"
                    className={css.contentLink}
                >
                    {subTitle} <ChevronRightIcon size={16} />
                </Link>
            </div>
            <div className={css.imageWrapper}>
                <img src={bookImage} className={css.image} />
            </div>
        </div>
    );
};
