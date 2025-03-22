import css from './swap-dropdown.module.css';
import {
    Dropdown,
    DropdownOptions,
} from '@/components/dropdown/dropdown.component.tsx';

interface SwapDropdownProps {
    options: DropdownOptions[];
    title: string;
}

export const SwapDropdown = ({ options }: SwapDropdownProps) => {
    return (
        <div className={css.swapDropdown}>
            <Dropdown title="Swap details" options={options} />
        </div>
    );
};
