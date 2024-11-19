import css from './purchase-sell-title.module.css';

interface TitleProps {
    title: string;
}

const PurchaseSellIitle = (props: TitleProps) => {
    return <h1 className={css.title}>{props.title}</h1>
}

export default PurchaseSellIitle;
