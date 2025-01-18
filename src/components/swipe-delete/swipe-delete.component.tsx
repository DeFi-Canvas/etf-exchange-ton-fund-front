import css from './swipe-delete.module.css';

import { TrashIcon } from '@/components/Icons/Icons.tsx';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

interface SwipeDeleteProps {
    id: number;
    children: React.ReactNode;
    onDelete: (id: number) => void;
}

export const SwipeDelete = ({ id, children, onDelete }: SwipeDeleteProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isSwiping, setIsSwiping] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showButton, setShowButton] = useState(false);
    const [animationDelete, setAnimationDelete] = useState(false);

    const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        setIsSwiping(true);
        setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isSwiping) return;

        const newPosition = { x: event.clientX, y: event.clientY };
        const deltaX = Math.abs(newPosition.x - position.x);

        if (deltaX >= 10) {
            setShowButton(true);
        }
        if (deltaX >= 15) {
            setAnimationDelete(true);
            setTimeout(() => {
                onDelete(id);
                setIsSwiping(false);
            }, 300);
        }

        setPosition(newPosition);
    };

    const handleMouseUp = () => {
        setIsSwiping(false);
        setTimeout(() => setShowButton(false), 1000);
    };

    useEffect(() => {
        const element = ref.current;
        if (element) {
            element.addEventListener('mousedown', handleMouseDown);
            element.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                element.removeEventListener('mousedown', handleMouseDown);
                element.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [handleMouseDown, handleMouseMove, handleMouseUp]);

    return (
        <div ref={ref}>
            <div
                className={cn(css.swipeDeleteLine, {
                    [css.swipeDeleteLineSlide]: showButton,
                    [css.swipeDeleteFull]: animationDelete,
                })}
            >
                {children}
                <div className={css.buttonRemove} onClick={() => onDelete(id)}>
                    <TrashIcon />
                    <span>Remove</span>
                </div>
            </div>
        </div>
    );
};
