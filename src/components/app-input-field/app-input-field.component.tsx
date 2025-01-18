import cn from 'classnames';
import css from './app-input-field.module.css';
import { SerchIcon } from '@/components/Icons/Icons.tsx';

interface AppInputFieldProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const AppInputField = ({
    value,
    onChange,
    className,
}: AppInputFieldProps) => {
    return (
        <div className={cn(css.inputFieldWrapepr, className)}>
            <SerchIcon className={css.inputFieldIcon} />
            <input
                className={cn(css.inputField)}
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
};
