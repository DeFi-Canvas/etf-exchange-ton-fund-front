import css from './textarea-field.module.css';
import React, { useState } from 'react';
import cn from 'classnames';

interface TextareaFieldProps {
    label?: string;
    placeholder?: string;
    className?: string;
    limitWordMin?: number;
    limitWordMax?: number;
}

export const TextareaField = ({
    label = '',
    placeholder = '',
    className = '',
    limitWordMin = 0,
    limitWordMax = 0,
}: TextareaFieldProps) => {
    const [currentCountWord, setCurrentCountWord] = useState(0);
    const [textareaValue, setTextareaValue] = useState('');

    const onChangeTextarea = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (event.target.value.length > limitWordMax) {
            return;
        }

        setTextareaValue(event.target.value);
        setCurrentCountWord(event.target.value.length);
    };

    return (
        <div className={cn(css.textareaFieldWrapper, className)}>
            {label && <label htmlFor="textareaField">{label}</label>}
            <textarea
                id="textareaField"
                rows={2}
                className={css.textareaField}
                placeholder={placeholder}
                onChange={onChangeTextarea}
                value={textareaValue}
            />
            {limitWordMin && limitWordMax && (
                <div className="ms-auto">
                    <span
                        className={cn({
                            ['color-system-green']:
                                currentCountWord > 0 &&
                                currentCountWord >= limitWordMin &&
                                currentCountWord <= limitWordMax,
                        })}
                    >
                        {currentCountWord}
                    </span>
                    / {limitWordMin}-{limitWordMax}
                </div>
            )}
        </div>
    );
};
