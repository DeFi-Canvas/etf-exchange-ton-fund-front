import { useState, useEffect, useRef } from 'react';
import css from './amount-field.module.css';
import cn from 'classnames';

const AmountField = () => {
    const [value, setValue] = useState('');
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
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }
  
    const measureTextWidth = (text: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context && inputRef?.current) {
            context.font = window.getComputedStyle(inputRef.current).font;
            return context.measureText(text).width;
        }

        return 0;
    }

    // TODO:N Мок, для определения ошибки
    const fieldError = false;
    
    return (
        <div className={cn(css.fieldContainer, { [css.fieldError]: fieldError })}>
            <input
                ref={inputRef}
                type="number"
                className={css.field} 
                value={value}
                onChange={handleChange}
                placeholder='0'
            />
            <label style={{ left: currencyLeft }} className={css.currencyLabel}>TON</label>
        </div>
    )
}

export default AmountField;
