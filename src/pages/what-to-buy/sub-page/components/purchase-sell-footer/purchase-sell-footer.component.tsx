// Templates
import AppButton from '@/components/app-button/app-button.component.tsx';
// Style
import css from './purchase-sell-footer.module.css';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';

export interface PurchaseSellFooterProps {
    title: string;
    onClick: () => void;
    isLoading: boolean;
    isDisabled: boolean;
}

const PurchaseSellFooter = (props: PurchaseSellFooterProps) => {
    return (
        <AppFooter>
            <AppButton
                className={css.button}
                label={props.title}
                onClick={props.onClick}
                isLoading={props.isLoading}
                isDisabled={props.isDisabled}
            />
        </AppFooter>
    );
};

export default PurchaseSellFooter;
