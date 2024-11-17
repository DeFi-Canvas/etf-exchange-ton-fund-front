import { AssetsPnl } from '@/components/assets-card/assets-card.model.ts';
import css from '@/components/assets-card/components/common-card.module.css';
import cn from 'classnames';

interface CardPnlProps extends AssetsPnl {}

const CardPnl = (props: CardPnlProps) => {
    const isStatusSuccess = props.pnl.status === 'UP';
    const isStatusError = props.pnl.value === 'DOWN';

    return (
        <div className={css.card}>
            <img className={css.image} src={props.img} alt="" />

            <div className={css.infoWrapper}>
                <div className={cn(css.cardColumn, css.cardInfo)}>
                    <span className={css.title}>{props.title}</span>
                    <span className={css.subtitle}>{props.subTitle}</span>
                </div>
                {props.price && (
                    <div className={cn(css.cardColumn, css.cardPrice)}>
                        <span
                            dangerouslySetInnerHTML={{ __html: props.price }}
                        />
                        {props.pnl.value && (
                            <span
                                className={cn(css.priceText, {
                                    [css.priceTextGreen]: isStatusSuccess,
                                    [css.priceTextRed]: isStatusError,
                                })}
                            >
                                {props.pnl.value}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardPnl;
