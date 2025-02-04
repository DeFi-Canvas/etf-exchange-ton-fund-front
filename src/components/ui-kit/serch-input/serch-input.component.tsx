import { SerchIcon } from '@/components/Icons/Icons';
import { useCallback, useRef, useState } from 'react';
import css from './serch-input.module.css';
import cn from 'classnames';
import { debounce } from '@/utils/debounce';
import { trackTelemetree, TrackedEvents } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

export interface SerchInputProps {
    placeholder: string;
    theme?: string;
    onClick?: () => void;
    trackEvent?: TrackedEvents;
}

export const SerchInput = ({
    placeholder,
    theme,
    trackEvent,
}: SerchInputProps) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const eventBuilder = useTWAEvent();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        inputRef.current.focus();
    };

    const handleDebouncedChange = useCallback(
        debounce((newValue: string) => {
            trackEvent &&
                trackTelemetree(eventBuilder, trackEvent, {
                    serchInput: newValue,
                });
        }, 400),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setValue(newValue);
        handleDebouncedChange(newValue);
    };
    return (
        <div className={cn(css.wrap, theme)} onClick={handleClick}>
            <SerchIcon />
            <input
                type="text"
                placeholder={placeholder}
                className={css.input}
                inputMode={'text'}
                ref={inputRef}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
