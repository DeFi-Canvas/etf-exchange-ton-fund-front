import { SpinIcon } from '../Icons/Icons';
import css from './AppButton.module.scss';
import { Link } from '@/components/Link/Link.tsx';

type TButtomType = 'default' | 'secondary';

interface AppButtonProps {
    label: string;
    className?: string;
    type?: TButtomType;
    to?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
}

const AppButton = (props: AppButtonProps) => {
    // Script
    const buttonType = props?.type ?? 'default';
    const classList = [
        props.className,
        css.button,
        buttonType === 'secondary' ? css.buttonSecondary : '',
    ].join(' ');

    // Template
    return props.to ? (
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
