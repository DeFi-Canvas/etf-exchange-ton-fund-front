import cn from 'classnames';
// Style
import css from './purchase-sell-field-counter.module.css';

export interface PurchaseSellFieldCounterProps {
    setValue: (ammount: number) => void;
    quantity: number;
}

const PurchaseSellFieldCounter = ({
    setValue,
    quantity,
}: PurchaseSellFieldCounterProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const val = Number(inputValue);
        setValue(val);
    };

    return (
        <div className={css.fieldCounter}>
            <input
                type={'number'}
                className={cn('trim-lines-1', css.fieldCounterInput)}
                value={`${quantity}`}
                onChange={onChange}
                inputMode={'numeric'}
                placeholder="Enter amount"
            />
        </div>
    );
};

export default PurchaseSellFieldCounter;
