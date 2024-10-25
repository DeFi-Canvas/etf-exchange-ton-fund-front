import { useRef } from 'react';
import './SlideButton.scss'; // Import your CSS styles here
import Draggable from 'react-draggable';
import { RightIcon } from '@/components/Icons/Icons.tsx';

interface SwipeButtonProps {
    onSwipe: () => void;
}

const SlideButton = ({ onSwipe }: SwipeButtonProps) => {
    const draggableRef = useRef<Draggable>(null);

    const handleDrag = () => {
        if (
            draggableRef &&
            draggableRef?.current &&
            'x' in draggableRef?.current?.state &&
            draggableRef?.current?.state?.x === 242
        ) {
            onSwipe();
        }
    };

    return (
        <div className={'swipable-container'}>
            <Draggable
                axis="x"
                bounds={{ left: 0, right: 242 }}
                onDrag={handleDrag}
                ref={draggableRef}
            >
                <div className="swipe-button">
                    <RightIcon />
                </div>
            </Draggable>
            <span className="text">Slide to sign</span>
        </div>
    );
};

export default SlideButton;
