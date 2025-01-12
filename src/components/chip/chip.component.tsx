import css from './chip.module.css';
import cn from 'classnames';

interface ChipProps {
    text: string;
    className?: string;
}

export const Chip = ({ text, className = '' }: ChipProps) => {
    return <div className={cn(css.chip, className)}>{text}</div>;
};
