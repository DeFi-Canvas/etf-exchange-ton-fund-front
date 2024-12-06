import cn from 'classnames';
// Templates
import { MinusIcon, PlusIcon } from '@/components/Icons/Icons';
// Style
import css from './purchase-sell-field-counter.module.css';
import { useState } from 'react';

export interface PurchaseSellFieldCounterProps {
    quantity: number;
    increment: () => void;
    dicrement: () => void;
    isButtomMinusDisabled: boolean;
    isButtomPlusDisabled: boolean;
}

const PurchaseSellFieldCounter = ({
    quantity,
    increment,
    dicrement,
    isButtomMinusDisabled,
    isButtomPlusDisabled,
}: PurchaseSellFieldCounterProps) => {
    const [inputVal, setInputVal] = useState(quantity);

    const onIncrement = () => {
        setInputVal((x) => x + 1);
        increment();
    };
    const onDicrement = () => {
        setInputVal((x) => x - 1);
        dicrement();
    };

    return (
        <div className={css.fieldCounter}>
            <input
                type="text"
                className={cn('trim-lines-1', css.fieldCounterInput)}
                disabled
                value={`${inputVal} pcs.`}
            />
            <div className={css.fieldCounterButtons}>
                <button
                    onClick={onDicrement}
                    className={cn(css.fieldCounterButton, {
                        [css.fieldCounterButtonDisabled]: isButtomMinusDisabled,
                    })}
                    disabled={isButtomMinusDisabled}
                >
                    <MinusIcon />
                </button>
                <button
                    onClick={onIncrement}
                    className={cn(css.fieldCounterButton, {
                        [css.fieldCounterButtonDisabled]: isButtomPlusDisabled,
                    })}
                    disabled={isButtomPlusDisabled}
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
};

export default PurchaseSellFieldCounter;
