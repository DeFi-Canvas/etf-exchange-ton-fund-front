import css from './strategy-fees.module.css';
import cn from 'classnames';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { InputField } from '@/components/ui-kit/input-field/input-field.component.tsx';
import { RangePicker } from '@/components/ui-kit/range-picker/range-picker.component.tsx';
import { useState } from 'react';

export const StrategyFees = () => {
    const [stepValue, setStepValue] = useState('0');
    const saveIsDisabled = true;
    const feesDetail = [
        { id: 0, title: 'DeFi Canvas expense ratio', value: '0,5%' },
        { id: 1, title: 'Your expense ratio', value: '0%' },
        { id: 2, title: 'Your profit fee', value: '4%' },
    ];

    const changeStep = (step: string) => {
        console.log(step);
        setStepValue(step);
    };

    return (
        <div className={css.page}>
            <header className={'app-container'}>
                <h2 className="h2">Fees</h2>
                <p className="body-m-regular color-text-dark-70 mt-1">
                    Add the amount of commission you will receive per annual
                    maintenance and the profitability of your investigators.
                </p>
            </header>
            <div className={css.body}>
                <div className={css.ratioFieldWrapper}>
                    <InputField label="Expense ratio (%)" placeholder="0" />
                    <button className={css.ratioFieldButton}>MAX: 3%</button>
                </div>
                <RangePicker
                    className="mt-6"
                    label="Profit fee (%)"
                    value={stepValue}
                    changeStep={changeStep}
                />
            </div>
            <div className={cn(css.details, 'app-container')}>
                <div className="body-l-medium">Fees details</div>
                <ul className={css.detailsList}>
                    {feesDetail.map((detail) => (
                        <li key={detail.id} className={css.detailsItem}>
                            <span className="body-m-regular color-text-dark-70">
                                {detail.title}
                            </span>
                            <span className="body-m-regular">
                                {detail.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <AppFooter>
                <AppButton
                    label="Save"
                    isDisabled={saveIsDisabled}
                    to={'/strategy'}
                />
            </AppFooter>
        </div>
    );
};
