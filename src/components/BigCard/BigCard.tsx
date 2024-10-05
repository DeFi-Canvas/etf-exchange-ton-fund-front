import './BigCard.scss'
import {ReactNode} from "react";

type PropsType = {
  title: string
  children: ReactNode
}

const BigCard = ({children, title}: PropsType) => {
  return (
    <div className={'big-card'}>
      <h2>{title}</h2>

      {children}
    </div>
  );
};

export default BigCard;