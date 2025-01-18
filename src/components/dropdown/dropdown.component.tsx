import css from './dropdown.module.css';
import cn from 'classnames';
import { ChevronDownIcon } from '@/components/Icons/Icons.tsx';
import { CSSProperties, useState } from 'react';
import { getUuid } from '@/utils/uuid';

type CustomCSSProperties = CSSProperties & {
    '--height'?: string;
};

export interface DropdownOptions {
    name: string;
    value: string[];
}

interface DropdownProps {
    title: string;
    options: DropdownOptions[];
    className?: string;
}

const STYLES_CONFIG = {
    heightOptionItem: 21,
    gapBetweenOptions: 12,
    gapBetweenItemValue: 8,
};

export const Dropdown = ({ title, options, className = '' }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(true);

    // Расчёт высоты каждого айтема в дропдауне, нужен для анимации
    const heightOptionItemValueWithGap = options.reduce((acc, option) => {
        const countOptions = option.value.length;
        const heightOptionName = STYLES_CONFIG.heightOptionItem;
        const heightOptionValue = countOptions * STYLES_CONFIG.heightOptionItem;
        const gap = countOptions * STYLES_CONFIG.gapBetweenItemValue;

        // Высота заголовка + отступ между элементами + высота опшена
        acc += heightOptionName + gap + heightOptionValue;

        return acc;
    }, 0);
    const gap = (options.length - 1) * STYLES_CONFIG.gapBetweenOptions;

    const styleList: CustomCSSProperties = {
        '--height': `${heightOptionItemValueWithGap + gap}px`,
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
                    {options.map((option) => {
                        const itemsValue = option.value.map((value) => (
                            <span key={getUuid()}>{value}</span>
                        ));

                        return (
                            <div key={getUuid()} className={css.optionItem}>
                                <span className={css.optionItemName}>
                                    {option.name}
                                </span>
                                {itemsValue}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
