import AppButton from '@/components/app-button/app-button.component';
import AppFooter from '@/components/app-footer/app-footer.components';

export interface SwapFooter {
    isDisabled: boolean;
    btnText: string;
    onClick: () => void;
}

export const SwapFooter = ({ isDisabled, onClick, btnText }: SwapFooter) => {
    return (
        <AppFooter>
            <AppButton
                label={btnText}
                isDisabled={isDisabled}
                onClick={onClick}
            />
        </AppFooter>
    );
};
