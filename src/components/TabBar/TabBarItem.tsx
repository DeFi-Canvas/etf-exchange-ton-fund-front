import { Link } from '@/components/Link/Link.tsx';
import css from './tab-bar.module.css';
import cn from 'classnames';

type PropsType = {
    children: React.ReactNode;
    to: string;
    text: string;
    onClick?: () => void;
    isAvailable?: boolean;
};

const TabBarItem = ({
    children,
    to,
    text,
    onClick,
    isAvailable = true,
}: PropsType) => {
    return isAvailable ? (
        <Link className={css.item} to={to} onClick={onClick}>
            {children}
            <span>{text}</span>
        </Link>
    ) : (
        <div className={cn(css.item, css.disabled)}>
            {children}
            <span>{text}</span>
        </div>
    );
};

export default TabBarItem;
