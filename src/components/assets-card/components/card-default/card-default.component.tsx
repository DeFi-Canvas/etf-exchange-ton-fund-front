import { Assets } from '@/components/assets-card/assets-card.model.ts';
import cn from 'classnames';
import css from '../common-card.module.css';

interface CardDefaultProps extends Assets {}

const CardDefault = (props: CardDefaultProps) => {
    return (
        <div className={css.card}>
            <img className={css.image} src={props.img} alt="" />

            <div className={css.infoWrapper}>
                <div className={cn(css.cardColumn, css.cardInfo)}>
                    <span className={css.title}>{props.title}</span>
                    <span className={cn(css.subtitle, 'trim-lines-1')}>
                        {props.subTitle}
                    </span>
                </div>
                {props.price && (
                    <div className={cn(css.cardColumn, css.cardPrice)}>
                        <span
                            dangerouslySetInnerHTML={{ __html: props.price }}
                        />
                        {props.priceText && (
                            <span className={css.priceText}>
                                {props.priceText}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardDefault;
