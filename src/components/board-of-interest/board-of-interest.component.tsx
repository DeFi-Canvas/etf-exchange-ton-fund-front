import { CSSProperties } from 'react';
import css from './board-of-interest.module.css';
import cn from 'classnames';

type CustomCSSProperties = CSSProperties & {
    '--background'?: string;
};
interface BoardOfInterestProps {
    backgroundColor?: string;
    imgs: [string, string, string, string, string, string, string];
    theme?: string;
    title: string;
    subTitle: string;
}

export const BoardOfInterest = ({
    backgroundColor,
    imgs,
    theme,
    title,
    subTitle,
}: BoardOfInterestProps) => {
    const style: CustomCSSProperties = {
        '--background': `${backgroundColor ?? '#fff'}`,
    };

    const imageSet = [imgs.slice(0, 3), imgs.slice(3)];
    
    return (
        <div className={cn(css.card, theme)} style={style}>
            <div className={css.cardHeader}>
                <div className={css.cardTitle}>{title}</div>
                <div className={css.cardSubTitle}>{subTitle}</div>
            </div>
            <div className={css.imageSet}>
                {imageSet.map(((imageList, index) => {
                    const isImageListWide = index % 2 !== 0;

                    return (
                        <div className={cn(css.imageList, {[css.imageListWide]: isImageListWide})}>
                            {imageList.map((imageSrc) => (
                                <img src={imageSrc} alt="Avatar" className={css.image} />
                            ))}
                        </div>
                    );
                }))}
            </div>
        </div>
    );
};
