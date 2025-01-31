import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import css from './swap-select-asset.module.css';
import { constVoid } from 'fp-ts/lib/function';
import { SwapResultStatus } from '../../swap.model';
import AppButton from '@/components/app-button/app-button.component';

export interface SwapResultProps {
    isOpen: boolean;
    status: SwapResultStatus;
    subTitle: string;
    logos: Array<string>;
    onClose: () => void;
}

export const SwapResult = ({
    isOpen,
    status,
    subTitle,
    logos,
    onClose,
}: SwapResultProps) => {
    return (
        <div>
            <BottomSheet open={isOpen} onClose={constVoid}>
                <h1>{status}</h1>
                {logos.map((src) => (
                    <img src={src} />
                ))}
                <span>{subTitle}</span>
                <AppButton label="Close" onClick={onClose} />
            </BottomSheet>
        </div>
    );
};
