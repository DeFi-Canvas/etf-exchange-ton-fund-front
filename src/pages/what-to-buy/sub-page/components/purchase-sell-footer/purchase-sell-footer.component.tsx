// Templates
import AppButton from '@/components/AppButton/AppButton';
// Style
import css from './purchase-sell-footer.module.css';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';

interface PurchaseSellFooterProps {
    title: string;
    onClick: () => void;
    isLoading: boolean;
}

const PurchaseSellFooter = (props: PurchaseSellFooterProps) => {
    return (
        <AppFooter>
            <AppButton
                className={css.button}
                label={props.title}
                onClick={props.onClick}
                isLoading={props.isLoading}
            />
        </AppFooter>
    );
};

export default PurchaseSellFooter;
