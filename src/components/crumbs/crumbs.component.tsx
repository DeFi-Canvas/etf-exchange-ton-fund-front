import css from './crumbs.module.css';

interface CrumbsProps {
    title: string;
}

//TODO: будет ссылкой
export const Crumbs = ({ title }: CrumbsProps) => {
    return <div className={css.crumbCard}>{title}</div>;
};
