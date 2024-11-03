import css from './lern-more.module.css';
import book from './assets/book.png';
import { SimpleArrowIcon } from '@/components/Icons/Icons';

export const LernMore = () => {
    return (
        <div className={css.wrap}>
            <div className={css.texts}>
                <span className={css.title}>
                    Learn more about our application in GitPages
                </span>
                <span className={css.link}>
                    <a
                        href="https://holstby.github.io/etf-exchange-ton-fund-gitbook/docs/introduction.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Learn more <SimpleArrowIcon />
                    </a>
                </span>
            </div>
            <div className={css.imgWrap}>
                <img src={book} alt="" />
            </div>
        </div>
    );
};
