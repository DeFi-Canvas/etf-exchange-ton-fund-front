import cn from 'classnames';
// Style
import css from './purchase-sell-field-counter.module.css';
import { useEffect, useState } from 'react';

export interface PurchaseSellFieldCounterProps {
    setValue: (ammount: number) => void;
    quantity: number;
}

const PurchaseSellFieldCounter = ({
    setValue,
    quantity,
}: PurchaseSellFieldCounterProps) => {
    const [inputVal, setInputVal] = useState(``);

    useEffect(() => {
        setInputVal(`${quantity?.toFixed(2)}`);
    }, [quantity]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const val = Number(inputValue);
        setValue(val);
        setInputVal(`${e.currentTarget.value}`);
    };

    return (
        <div className={css.fieldCounter}>
            <input
                type={'number'}
                className={cn('trim-lines-1', css.fieldCounterInput)}
                value={`${inputVal}`}
                onChange={onChange}
                inputMode={'numeric'}
                placeholder="Enter amount"
            />
        </div>
    );
};

export default PurchaseSellFieldCounter;
