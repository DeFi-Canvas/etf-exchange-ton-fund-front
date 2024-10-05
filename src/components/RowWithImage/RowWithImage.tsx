import './RowWithImage.scss'

type PropsType = {
  title: string
  subTitle: string
  image: string
  numbers?: string
}

const RowWithImage = ({image, numbers, subTitle, title}: PropsType) => {
  return (
    <div className={'row-with-image'}>
      <div className={'row-with-image--content'}>
        <img src={image} alt={title} width={40} height={40}/>
        <div>
          <h3>{title}</h3>
          <p>{subTitle}</p>
        </div>
      </div>
      {numbers && <p className={'row-with-image--numbers'}>{numbers}</p>}
    </div>
  );
};

export default RowWithImage;