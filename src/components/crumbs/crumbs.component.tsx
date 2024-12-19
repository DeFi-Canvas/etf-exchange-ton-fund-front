import { Link } from 'react-router-dom';
import css from './crumbs.module.css';

interface CrumbsProps {
    title: string;
    to: string;
}

export const Crumbs = ({ title, to }: CrumbsProps) => {
    return (
        <Link className={css.crumbCard} to={to}>
            {title}
        </Link>
    );
};
