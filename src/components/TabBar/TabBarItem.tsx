import { Link } from '@/components/Link/Link.tsx';
import css from './tab-bar.module.css';

type PropsType = {
    children: React.ReactNode;
    to: string;
    text: string;
};

const TabBarItem = ({ children, to, text }: PropsType) => {
    return (
        <Link className={css.item} to={to}>
            {children}
            <span>{text}</span>
        </Link>
    );
};

export default TabBarItem;
