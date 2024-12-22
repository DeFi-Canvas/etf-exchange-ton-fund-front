import css from './dropdown.module.css';
import cn from 'classnames';
import { ChevronDownIcon } from '@/components/Icons/Icons.tsx';
import { CSSProperties, useState } from 'react';
import { getUuid } from '@/utils/uuid';

type CustomCSSProperties = CSSProperties & {
    '--height'?: string;
};

interface DropdownOptions {
    name: string;
    value: string;
}

interface DropdownProps {
    title: string;
    options: DropdownOptions[];
    className?: string;
}

const STYLES_OPTIONS = {
    heightItem: 21,
    gapBetweenItems: 12,
};

export const Dropdown = ({ title, options, className = '' }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const heightItem = options.length * STYLES_OPTIONS.heightItem;
    const gap = (options.length - 1) * STYLES_OPTIONS.gapBetweenItems;

    const styleList: CustomCSSProperties = {
        '--height': `${heightItem + gap}px`,
    };

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={cn(css.dropdown, className)}>
            <div className={css.dropdownHeader} onClick={toggleDropdown}>
                {title}
                <div
                    className={cn(css.iconChevronDown, {
                        [css.iconChevronDownActive]: isOpen,
                    })}
                >
                    <ChevronDownIcon />
                </div>
            </div>
            {options.length && (
                <div
                    className={cn(css.dropdownList, {
                        [css.dropdownListOpen]: isOpen,
                    })}
                    style={styleList}
                >
                    {options.map((option) => (
                        <div key={getUuid()} className={css.optionItem}>
                            <span className={css.optionItemName}>
                                {option.name}
                            </span>
                            <span>{option.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
