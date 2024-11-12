import styles from './AppButton.module.scss';

type TButtomType = 'default' | 'secondary';

interface IProps {
    label: string;
    type?: TButtomType,
    isDisabled?: boolean;
    onClick?: () => void;
};

const AppButton = (props: IProps) => {
    // Script
    const buttonType = props?.type ?? 'default';
    const classList = [
        styles.button,
        buttonType === 'secondary' ? styles.buttonSecondary : '',
    ].join(' ');

    // Template
    return (
        <button
            type="button"
            className={ classList }
            disabled={ props.isDisabled }
            onClick={ props.onClick }
        >
            { props.label }
        </button>
    );
};

export default AppButton;
