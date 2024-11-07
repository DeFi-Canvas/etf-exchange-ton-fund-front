import { SimpleArrowIcon } from '@/components/Icons/Icons';
import css from './withdraw.module.css';
import { Link } from 'react-router-dom';

export const Withdraw = () => {
    return (
        <div className={css.wrap}>
            <span className={css.title}>Withdraw</span>
            <Link className={css.linkWrap} to={'/withdraw'}>
                <span>Withdraw cryptocurrency</span>
                <SimpleArrowIcon className={css.arrow} />
            </Link>
        </div>
    );
};
