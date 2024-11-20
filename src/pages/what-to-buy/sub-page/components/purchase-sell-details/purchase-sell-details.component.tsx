import cn from 'classnames';
import { useState, CSSProperties } from 'react';
// Style
import css from './purchase-sell-details.module.css';
import { ChevronDown } from '@/components/Icons/Icons';

type CustomCSSProperties = CSSProperties & {
    '--height'?: string;
};

export interface PurchaseSellDetailsData {
    title: string;
    value: string;
}

interface PurchaseSellDetailsProps {
    title: string;
    details: PurchaseSellDetailsData[];
    className?: string;
}

const PurchaseSellDetails = (props: PurchaseSellDetailsProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const heightDetailItem = props.details.length * 21;
    const gapBetweenDetailItem = (props.details.length - 1) * 12;
    const detailListHeight = heightDetailItem + gapBetweenDetailItem;

    const styleListDetailList: CustomCSSProperties = {
        '--height': `${detailListHeight}px`,
    };

    const toggleDetails = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={cn('app-container', props.className, css.details)}>
            <div className={css.detailsTitle} onClick={toggleDetails}>
                {props.title}
                <div
                    className={cn(css.iconChevron, {
                        [css.iconChevronActive]: isOpen,
                    })}
                >
                    <ChevronDown />
                </div>
            </div>
            {props.details.length && (
                <div
                    className={cn(css.detailList, {
                        [css.detailListOpen]: isOpen,
                    })}
                    style={styleListDetailList}
                >
                    {props.details.map((detail, index) => (
                        <div key={index} className={css.detailItem}>
                            <span className={css.detailItemTitle}>
                                {detail.title}
                            </span>
                            <span>{detail.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PurchaseSellDetails;
