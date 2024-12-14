import { SpinIcon } from '../Icons/Icons';
import css from './app-button.module.css';
import { Link } from '@/components/Link/Link.tsx';
import cn from 'classnames';

type ButtonType = 'default' | 'secondary' | 'white';

interface AppButtonProps {
    label: string;
    className?: string;
    type?: ButtonType;
    to?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
}

const AppButton = (props: AppButtonProps) => {
    const isDisabled = props.isDisabled ?? false;
    const buttonType = props?.type ?? 'default';
    const classList = cn(props.className, css.button, {
        [css.buttonSecondary]: buttonType === 'secondary',
        [css.buttonWhite]: buttonType === 'white',
        [css.buttonDisabled]: isDisabled,
    });

    return props.to && !isDisabled ? (
        <Link to={props.to} className={classList}>
            {props.isLoading ? (
                <SpinIcon className={css.spinLoading} type="light" />
            ) : (
                props.label
            )}
        </Link>
    ) : (
        <button
            type="button"
            className={classList}
            disabled={props.isDisabled}
            onClick={props.onClick}
        >
            {props.isLoading ? (
                <SpinIcon className={css.spinLoading} type="light" />
            ) : (
                props.label
            )}
        </button>
    );
};

export default AppButton;
