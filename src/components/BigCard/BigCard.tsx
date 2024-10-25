import { ReactNode } from 'react';
import './BigCard.scss';

type PropsType = {
    title?: string;
    children: ReactNode;
};

const BigCard = ({ children, title }: PropsType) => {
    return (
        <div className={'big-card'}>
            {title && <h2>{title}</h2>}
            {children}
        </div>
    );
};

export default BigCard;
