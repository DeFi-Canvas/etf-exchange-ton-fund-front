import { useState } from 'react';
import css from './control.module.css';
import cn from 'classnames';

const CONTROL = [
    {
        id: 0,
        label: '1D',
        isActive: true,
    },
    {
        id: 1,
        label: '3M',
        isActive: false,
    },
    {
        id: 2,
        label: '6M',
        isActive: false,
    },
    {
        id: 3,
        label: 'Y',
        isActive: false,
    },
    {
        id: 4,
        label: 'All',
        isActive: false,
    },
];

interface ChartControlProps {
    controlOnClick: (id: number) => void;
}

export const ChartControl = ({ controlOnClick }: ChartControlProps) => {
    const [control, setControl] = useState(CONTROL);

    const onClick = (id: number) => {
        setControl((controls) =>
            controls.map((control) =>
                control.id === id
                    ? { ...control, isActive: true }
                    : { ...control, isActive: false }
            )
        );
        controlOnClick(id);
    };

    return (
        <div className={css.wrap}>
            {control.map((el) => (
                <div
                    key={el.id}
                    className={cn(css.control, { [css.active]: el.isActive })}
                    onClick={() => onClick(el.id)}
                >
                    <span>{el.label}</span>
                </div>
            ))}
        </div>
    );
};
