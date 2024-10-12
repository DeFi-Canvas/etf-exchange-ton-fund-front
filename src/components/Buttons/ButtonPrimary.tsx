import './Buttons.scss'

type PropsType = {
  text: string
  isDisabled?: boolean
  onClick?: () => void
  className?: string
}

const ButtonPrimary = ({text, onClick, isDisabled, className = ''}:PropsType) => {
  return (
    <button className={`button-primary ${className}`} onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default ButtonPrimary;