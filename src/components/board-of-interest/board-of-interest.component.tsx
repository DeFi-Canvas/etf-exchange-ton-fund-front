import { CSSProperties } from 'react';
import css from './board-of-interest.module.css';
import cn from 'classnames';

type CustomCSSProperties = CSSProperties & {
    '--backgroundColor'?: string;
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
        '--backgroundColor': `${backgroundColor ?? '#fff'}`,
    };

    return (
        <div className={cn(css.wrap, theme)} style={style}>
            <div className={css.titles}>
                <span className={css.topTitle}>{title}</span>
                <span className={css.bottomTitle}>{subTitle}</span>
            </div>
            {/* TODO: сделанно шакально ВОВА СДЕЛАЙ КРАСИВА Я НАГАДИЛ ТУТ*/}
            <div className={css.imgBody}>
                <div className={css.imgWrap}>
                    {imgs.slice(0, 3).map((src) => (
                        <img src={src} alt="" key={src} className={css.img} />
                    ))}
                </div>
                <div className={css.imgWrap}>
                    {imgs.slice(3).map((src) => (
                        <img src={src} alt="" key={src} className={css.img} />
                    ))}
                </div>
            </div>
        </div>
    );
};
