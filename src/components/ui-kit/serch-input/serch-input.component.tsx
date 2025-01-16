import { SerchIcon } from '@/components/Icons/Icons';
import { useCallback, useRef, useState } from 'react';
import css from './serch-input.module.css';
import cn from 'classnames';
import { debounce } from '@/utils/debounce';
import { trackMixpanel, TrackMixpanelEvents } from '@/mixpanel/mixpanel-entry';

export interface SerchInputProps {
    placeholder: string;
    theme?: string;
    onClick?: () => void;
    trackEvent?: TrackMixpanelEvents;
}

export const SerchInput = ({
    placeholder,
    theme,
    trackEvent,
}: SerchInputProps) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

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
                trackMixpanel(trackEvent, {
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
