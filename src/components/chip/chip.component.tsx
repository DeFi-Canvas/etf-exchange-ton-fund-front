import css from './chip.module.css';
import cn from 'classnames';

interface ChipProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export const Chip = ({ text, className = '', onClick }: ChipProps) => {
    return (
        <div onClick={onClick} className={cn(css.chip, className)}>
            {text}
        </div>
    );
};
