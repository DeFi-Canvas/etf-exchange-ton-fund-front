import css from './news-earn.module.css';
import coinImg from './assets/coin-1.png';
import coin2Img from './assets/coin-2.png';
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
                <div>
                    <img src={coin2Img} alt="" className={css.img2} />
                    <img src={coinImg} alt="" className={css.img} />
                </div>
            </div>
        </div>
    );
};
