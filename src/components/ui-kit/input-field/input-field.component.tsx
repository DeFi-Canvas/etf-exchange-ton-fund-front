import css from './input-field.module.css';
import React, { useState } from 'react';
import cn from 'classnames';

interface InputFieldProps {
    label?: string;
    placeholder?: string;
    limitWord?: number;
    className?: string;
}

export const InputField = ({
    label = '',
    placeholder = 'Enter text',
    limitWord = 0,
    className = '',
}: InputFieldProps) => {
    const [currentCountWord, setCurrentCountWord] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (limitWord && event.target.value.length > limitWord) {
            return;
        }

        setInputValue(event.target.value);
        setCurrentCountWord(event.target.value.length);
    };

    return (
        <div className={cn(css.inputFieldWrapper, className)}>
            {label && <label htmlFor="inputField">{label}</label>}
            <input
                type="text"
                id="inputField"
                className={css.inputField}
                placeholder={placeholder}
                value={inputValue}
                onChange={onChangeInput}
            />
            {limitWord > 0 && (
                <div className="ms-auto">
                    <span
                        className={cn({
                            ['color-system-green']:
                                currentCountWord > 0 &&
                                currentCountWord <= limitWord,
                        })}
                    >
                        {currentCountWord}
                    </span>
                    / {limitWord}
                </div>
            )}
        </div>
    );
};
