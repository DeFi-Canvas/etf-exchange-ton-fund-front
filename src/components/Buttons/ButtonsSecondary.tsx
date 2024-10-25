import './Buttons.scss';

type PropsType = {
    text: string;
    isDisabled?: boolean;
    onClick?: () => void;
};

const ButtonsSecondary = ({ text, onClick, isDisabled }: PropsType) => {
    return (
        <button
            className={'button-primary button-secondary'}
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};

export default ButtonsSecondary;
