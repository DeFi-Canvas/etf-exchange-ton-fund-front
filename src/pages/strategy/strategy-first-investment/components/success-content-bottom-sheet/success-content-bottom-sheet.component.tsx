import css from './success-content-bottom-sheet.module.css';
import { SuccessIcon } from '@/components/Icons/Icons.tsx';
import cn from 'classnames';
import AppButton from '@/components/app-button/app-button.component.tsx';

interface SuccessContentBottomSheetProps {
    title: string;
    onClose: () => void;
}

export const SuccessContentBottomSheet = ({
    title,
    onClose,
}: SuccessContentBottomSheetProps) => {
    const details = [
        { id: 0, name: 'Value', value: '$ 50' },
        { id: 1, name: 'Total amount in USD', value: '$ 50' },
        { id: 2, name: 'Total amount in TON', value: '10,21' },
    ];

    return (
        <div>
            <div className={css.body}>
                <img src="temp-strategy-cover.png" className={css.cover} />
                <div className={css.statusWrapper}>
                    <div className={cn(css.statusIcon, 'color-system-green')}>
                        <SuccessIcon />
                    </div>
                    <p className="subhead-s">Publish is successful</p>
                </div>
                <p className="body-m-regular color-text-dark-70 mt-2">
                    «{title}» Strategy publish
                </p>
                <div className={css.detailsList}>
                    {details.map((detail) => {
                        return (
                            <div key={detail.id} className={css.detailsItem}>
                                <div className="body-m-regular color-text-dark-70">
                                    {detail.name}
                                </div>
                                <div className="body-l-medium">
                                    {detail.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <AppButton label="Close" className="mt-2" onClick={onClose} />
        </div>
    );
};
