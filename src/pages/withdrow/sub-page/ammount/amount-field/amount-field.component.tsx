import { useState, useEffect, useRef } from 'react';
import css from './amount-field.module.css';
import cn from 'classnames';

interface AmountFieldProps {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currency: string;
    isError: boolean;
}

const AmountField = ({
    value,
    handleChange,
    currency,
    isError,
}: AmountFieldProps) => {
    const [currencyLeft, setCurrencyLeft] = useState('35px');
    const inputRef = useRef(null);

    useEffect(() => {
        if (value.length > 0) {
            const textWidth = measureTextWidth(value);
            setCurrencyLeft(`${textWidth + 8}px`);
        } else {
            setCurrencyLeft('35px');
        }
    }, [value]);

    const measureTextWidth = (text: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context && inputRef?.current) {
            context.font = window.getComputedStyle(inputRef.current).font;
            return context.measureText(text).width;
        }

        return 0;
    };

    return (
        <div className={cn(css.fieldContainer, { [css.fieldError]: isError })}>
            <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                className={css.field}
                value={value}
                onChange={handleChange}
                placeholder="0"
            />
            <label style={{ left: currencyLeft }} className={css.currencyLabel}>
                {currency}
            </label>
        </div>
    );
};

export default AmountField;
