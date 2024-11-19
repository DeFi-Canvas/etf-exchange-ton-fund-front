import cn from 'classnames';
// Templates
import { MinusIcon, PlusIcon } from '@/components/Icons/Icons';
// Style
import css from './purchase-sell-field-counter.module.css';

const PurchaseSellFieldCounter = () => {
    const fieldValue = '5 pcs.';
    const isButtomMinusDisabled = false;
    const isButtomPlusDisabled = true;

    return (
        <div className={css.fieldCounter}>
            <input type="text" className={cn('trim-line', css.fieldCounterInput)} disabled value={fieldValue} />
            <div className={css.fieldCounterButtons}>
                <button className={cn(css.fieldCounterButton, { [css.fieldCounterButtonDisabled]: isButtomMinusDisabled })}>
                    <MinusIcon />
                </button>
                <button className={cn(css.fieldCounterButton, { [css.fieldCounterButtonDisabled]: isButtomPlusDisabled })}>
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
}

export default PurchaseSellFieldCounter;
