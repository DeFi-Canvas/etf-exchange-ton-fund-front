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
}

const PurchaseSellFieldCounter = ({
    quantity,
    increment,
    dicrement,
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

    const isButtomMinusDisabled = false;
    const isButtomPlusDisabled = false;

    return (
        <div className={css.fieldCounter}>
            <input
                type="text"
                className={cn('trim-line', css.fieldCounterInput)}
                disabled
                value={`${inputVal} pcs.`}
            />
            <div className={css.fieldCounterButtons}>
                <button
                    onClick={onDicrement}
                    className={cn(css.fieldCounterButton, {
                        [css.fieldCounterButtonDisabled]: isButtomMinusDisabled,
                    })}
                >
                    <MinusIcon />
                </button>
                <button
                    onClick={onIncrement}
                    className={cn(css.fieldCounterButton, {
                        [css.fieldCounterButtonDisabled]: isButtomPlusDisabled,
                    })}
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
};

export default PurchaseSellFieldCounter;
