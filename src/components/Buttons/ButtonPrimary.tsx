import './Buttons.scss'

type PropsType = {
  text: string
  isDisabled?: boolean
  onClick?: () => void
}

const ButtonPrimary = ({text, onClick, isDisabled}:PropsType) => {
  return (
    <button className={'button-primary'} onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default ButtonPrimary;