import css from './file-field.module.css';
import { AddImageIcon } from '@/components/Icons/Icons.tsx';
import cn from 'classnames';

interface FileFieldProps {
    type?: 'default' | 'round';
    sizeLimit?: number;
    label: string;
}

export const FileField = ({
    type = 'default',
    sizeLimit = 5,
    label,
}: FileFieldProps) => {
    const imageIsLoaded = false;
    const isLoading = false;

    return (
        <div className={css.wrapper}>
            <p className="body-m-medium">{label}</p>
            <div
                className={cn(css.imageWrapper, 'mt-2', {
                    [css.rounded]: type === 'round',
                })}
            >
                {isLoading && (
                    <div
                        className={cn(
                            css.imageLoading,
                            css.loadingStartAnimation
                        )}
                    >
                        <span className={css.imageLoadingText}>
                            Uploading...
                        </span>
                    </div>
                )}
                {/* Показываем загруженнное изображение */}
                {imageIsLoaded && !isLoading && (
                    <img
                        className={css.image}
                        src="temp-strategy-cover.png"
                        alt="Image strategy"
                    />
                )}
                {/* Если изображение ещё не загружено */}
                {!imageIsLoaded && !isLoading && (
                    <div className={css.imageEmpty}>
                        {type === 'default' && (
                            <p className="body-m-medium">
                                Recommended aspect ratio: 16:9
                            </p>
                        )}
                        <p className="body-m-medium color-pallet-grey">
                            Size limit: {`${sizeLimit}MB`}
                        </p>
                    </div>
                )}
            </div>
            <label className={cn(css.labelFileField, 'color-main-purple')}>
                <input type="file" className={css.originFileField} />
                <div className={css.buttonFileField}>
                    <AddImageIcon />
                </div>
            </label>
        </div>
    );
};
