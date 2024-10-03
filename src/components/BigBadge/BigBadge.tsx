import './BigBadge.scss'

type PropsType ={
  text:string
  className?:string
}

const BigBadge = ({text, className =''}:PropsType) => {
  return (
    <div className={`big-badge ${className}`}>
      <p>{text}</p>
    </div>
  );
};

export default BigBadge;