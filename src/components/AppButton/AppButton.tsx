import styles from './AppButton.module.scss';
import { Link } from '@/components/Link/Link.tsx';

type TButtomType = 'default' | 'secondary';

interface IProps {
    label: string;
    type?: TButtomType;
    to?: string;
    isDisabled?: boolean;
    onClick?: () => void;
}

const AppButton = (props: IProps) => {
    // Script
    const buttonType = props?.type ?? 'default';
    const classList = [
        styles.button,
        buttonType === 'secondary' ? styles.buttonSecondary : '',
    ].join(' ');

    // Template
    return props.to ? (
        <Link to={props.to} className={classList}>
            {props.label}
        </Link>
    ) : (
        <button
            type="button"
            className={classList}
            disabled={props.isDisabled}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default AppButton;
