import css from './purchase-sell-title.module.css';
import cn from 'classnames';

interface TitleProps {
    title: string;
}

const PurchaseSellIitle = (props: TitleProps) => {
    return <h1 className={cn('app-container', css.title)}>{props.title}</h1>
}

export default PurchaseSellIitle;
