import './RowWithImage.scss'

type PropsType = {
  title: string
  subTitle: string
  image: string
  numbers?: string | number
  onClick?: () => void
  disabled?: boolean
  className?: string
  isSelected?: boolean
}

const RowWithImage = ({image, numbers, subTitle, title, onClick, disabled, className = '', isSelected}: PropsType) => {
  const handleClick = () => {
    if (disabled) return
    if (onClick) onClick()
  }

  return (
    <div className={`row-with-image ${disabled ? 'disabled' : ''} ${className} ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className={'row-with-image--content'}>
        <img src={image} alt={title} width={40} height={40}/>
        <div>
          <h3>{title}</h3>
          <p>{subTitle}</p>
        </div>
      </div>
      {numbers !== undefined && <p className={'row-with-image--numbers'}>{numbers}</p>}
    </div>
  );
};

export default RowWithImage;