/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SerchIcon } from '@/components/Icons/Icons';
import { useEffect, useRef } from 'react';
import css from './serch-input.module.css';
import cn from 'classnames';

export interface SerchInputProps {
    placeholder: string;
    theme?: string;
}

// export const SerchInput = ({ placeholder, theme }: SerchInputProps) => {
//     const inputRef = useRef(null);

//     const handleClick = (e: React.MouseEvent<HTMLElement>) => {
//         e.stopPropagation();
//         e.preventDefault();
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         //@ts-ignore
//         inputRef.current.focus();
//     };
//     return (
//         <div className={cn(css.wrap, theme)} onClick={handleClick}>
//             <SerchIcon />
//             <input
//                 type="text"
//                 placeholder={placeholder}
//                 className={css.input}
//                 inputMode={'text'}
//                 ref={inputRef}
//             />
//         </div>
//     );
// };
export const SerchInput = ({ placeholder, theme }: SerchInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };

    useEffect(() => {
        //@ts-ignore
        const tg = window.Telegram.WebApp;
        if (tg) {
            tg.ready();
            tg.expand();
        }
    }, []);

    return (
        <div className={cn(css.wrap, theme)} onClick={handleClick}>
            <SerchIcon />
            <input
                type="text"
                placeholder={placeholder}
                className={css.input}
                inputMode="text"
                ref={inputRef}
            />
        </div>
    );
};
