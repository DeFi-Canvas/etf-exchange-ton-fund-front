import css from './news-earn.module.css';
import coinSmallBlur from './assets/coin-small-blur.png';
import coinBig from './assets/coin-big.png';
import { SimpleArrowIcon } from '@/components/Icons/Icons';
import { Link } from 'react-router-dom';

export const NewsEarn = () => {
    return (
        <div>
            <div className={css.wrap}>
                <div className={css.cardWrap}>
                    <span className={css.title}>
                        Earn some TON for simple tasks
                    </span>
                    <span className={css.link}>
                        <Link to={'/profile'}>
                            Learn more <SimpleArrowIcon />
                        </Link>
                    </span>
                </div>
                <div className={css.cardImageWrapper}>
                    <img src={coinSmallBlur} alt="" className={ css.coinSmallBlur  } />
                    <img src={coinBig} alt="" className={ css.coinBig } />
                </div>
            </div>
        </div>
    );
};
