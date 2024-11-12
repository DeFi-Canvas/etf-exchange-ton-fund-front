import css from './news-earn.module.css';
import coinSmallBlurImage from './assets/coin-small-blur.png';
import coinBigImage from './assets/coin-big.png';
import { SimpleArrowIcon } from '@/components/Icons/Icons';
import { Link } from 'react-router-dom';

export const NewsEarn = () => {
    return (
        <div className={ css.card }>
            <div className={ css.content }>
                <span className={ css.contentTitle }>
                    Earn some TON for simple tasks
                </span>
                <Link to={ '/profile' } className={ css.contentLink }>
                    Learn more <SimpleArrowIcon />
                </Link>
            </div>
            <div className={ css.imageWrapper }>
                <img src={ coinSmallBlurImage } className={ css.coinSmallBlur  } />
                <img src={ coinBigImage } className={ css.coinBig } />
            </div>
        </div>
    );
};
