import { useState } from 'react';
import cn from 'classnames';
import { CopyIcon, CopyDoneIcon } from '@/components/Icons/Icons';
import css from './info-card.module.css';

interface InfoCardProps {
    title: string;
    node: string;
}

const InfoCard = (props: InfoCardProps) => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => {
        navigator.clipboard.writeText(props.node);
        setIsActive(true);

        setTimeout(() => {
            setIsActive(false);
        }, 3000);
    };
    const copyText = isActive ? 'Done' : 'Copy';
    const copyIcon = isActive ? <CopyDoneIcon /> : <CopyIcon />;

    return (
        <div className={css.infoCard}>
            <div className={css.content}>
                <span className={css.title}>{props.title}</span>
                <button
                    className={cn(css.button, { [css.buttonActive]: isActive })}
                    onClick={onClick}
                >
                    {copyText}
                    {copyIcon}
                </button>
            </div>
            <span className={css.node}>{props.node}</span>
        </div>
    );
};

export default InfoCard;
