import css from './save-draft-content-bottom-sheet.module.css';
import { SuccessIcon } from '@/components/Icons/Icons.tsx';
import cn from 'classnames';
import AppButton from '@/components/app-button/app-button.component.tsx';

interface SaveDraftContentBottomSheetProps {
    title: string;
    onClose: () => void;
}

export const SaveDraftContentBottomSheet = ({
    title,
    onClose,
}: SaveDraftContentBottomSheetProps) => {
    return (
        <div>
            <div className={css.body}>
                <img src="temp-strategy-cover.png" className={css.cover} />
                <div className={css.statusWrapper}>
                    <div className={cn(css.statusIcon, 'color-system-green')}>
                        <SuccessIcon />
                    </div>
                    <p className="subhead-s">Save is successful</p>
                </div>
                <p className="body-m-regular color-text-dark-70 mt-2">
                    «{title}» saved as draft
                </p>
            </div>
            <AppButton label="Close" className="mt-2" onClick={onClose} />
        </div>
    );
};
