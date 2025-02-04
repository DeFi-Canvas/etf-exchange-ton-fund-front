import { Link } from '@/components/Link/Link.tsx';
import css from './tab-bar.module.css';

type PropsType = {
    children: React.ReactNode;
    to: string;
    text: string;
    onClick?: () => void;
};

const TabBarItem = ({ children, to, text, onClick }: PropsType) => {
    return (
        <Link className={css.item} to={to} onClick={onClick}>
            {children}
            <span>{text}</span>
        </Link>
    );
};

export default TabBarItem;
