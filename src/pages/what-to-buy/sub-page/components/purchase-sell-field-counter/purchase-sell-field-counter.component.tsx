import cn from 'classnames';
// Style
import css from './purchase-sell-field-counter.module.css';
import { useState } from 'react';

export interface PurchaseSellFieldCounterProps {
    setValue: (ammount: number) => void;
}

const PurchaseSellFieldCounter = ({
    setValue,
}: PurchaseSellFieldCounterProps) => {
    const [inputVal, setInputVal] = useState('');

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
            />
        </div>
    );
};

export default PurchaseSellFieldCounter;
