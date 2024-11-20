// Templates
import AppButton from '@/components/AppButton/AppButton';
// Style
import css from './purchase-sell-footer.module.css';

interface PurchaseSellFooterProps {
    title: string;
    onClick: () => void;
}

const PurchaseSellFooter = (props: PurchaseSellFooterProps) => {
    return (
        <footer className={css.footer}>
            <AppButton className={css.button} label={props.title} onClick={props.onClick} isLoading={false} /> 
        </footer>
    )
}

export default PurchaseSellFooter;
