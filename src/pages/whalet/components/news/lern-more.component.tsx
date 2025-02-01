import css from './lern-more.module.css';
import bookImage from './assets/book.png';
import { ChevronRightIcon } from '@/components/Icons/Icons';
import { Link } from 'react-router-dom';
import { trackMixpanel } from '@/mixpanel/mixpanel-entry';

export const LernMore = () => {
    return (
        <div
            className={css.card}
            onClick={() => {
                trackMixpanel('WALLET_PAGE: "lern more" slide click');
            }}
            onTouchStart={() => {
                trackMixpanel('WALLET_PAGE: "lern more" slide click');
            }}
        >
            <div className={css.content}>
                <span className={css.contentTitle}>
                    Learn more about our application in GitPages
                </span>
                <Link
                    to={
                        'https://holstby.github.io/etf-exchange-ton-fund-gitbook/docs/introduction.html'
                    }
                    target="_blank"
                    rel="noreferrer"
                    className={css.contentLink}
                >
                    Learn more <ChevronRightIcon size={16} />
                </Link>
            </div>
            <div className={css.imageWrapper}>
                <img src={bookImage} className={css.image} />
            </div>
        </div>
    );
};
