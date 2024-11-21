import cn from 'classnames';
// Templates
import { ChevronDown } from '@/components/Icons/Icons';
// Types
import { InterfacePurchaseSellAssetCardData } from '../../types';
//TODO:V мб вынесем это в глобальные стили чтоб мозга ебать не пришлось каждый раз это импортить?
// Style
import css from './purchase-sell-asset-card.module.css';

interface PurchaseSellAssetCardProps
    extends InterfacePurchaseSellAssetCardData {
    onClick: () => void;
}

const PurchaseSellAssetCard = (props: PurchaseSellAssetCardProps) => {
    return (
        <div
            className={cn(css.card, {
                [css.cardWhite]: props.isBackgroundWhite,
            })}
            onClick={props.onClick}
        >
            <img src={props.imageSrc} className={css.cardImage} />
            <div className={css.cardContent}>
                <div className={css.cardContentInfo}>
                    <div className={css.cardContentInfoTitle}>
                        {props.title}
                    </div>
                    {props.subTitle && (
                        <div
                            className={cn(
                                'trim-lines-1',
                                css.cardContentInfoSubTitle
                            )}
                        >
                            {props.subTitle}
                        </div>
                    )}
                </div>
                <div className={css.cardAdditional}>
                    {props.price && <div>{props.price}</div>}
                    {props.allowedOpen && (
                        <div className={cn(css.icon, css.iconChevrone)}>
                            <ChevronDown />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurchaseSellAssetCard;
