import cn from 'classnames';
import css from '../onboarding.module.css';
// Templates
import { ImagesStep } from './images-step.component.tsx';
import { ContentStep } from './content-step.component.tsx';
// Images
import ton1 from '@/assets/images/onboarding/step-one/ton1.png';
import ton2 from '@/assets/images/onboarding/step-one/ton2.png';
import ton3 from '@/assets/images/onboarding/step-one/ton3.png';
import bubble2 from '@/assets/images/onboarding/step-one/bubble2.png';
import deFi from '@/assets/images/onboarding/step-one/de-fI.png';
import bubble1 from '@/assets/images/onboarding/step-one/bubble1.png';
import bubble3 from '@/assets/images/onboarding/step-one/bubble3.png';

interface StepOneProps {
    isStepOne: boolean;
    onClickButton: () => void;
}

const imagesStep = [
    {
        id: 'ton1',
        imageSrc: ton1,
        classList: cn(css.ton1, css.imageBlock, css.animationRotateZ),
    },
    {
        id: 'ton2',
        imageSrc: ton2,
        classList: cn(css.ton2, css.imageBlock, css.animationRotateX),
    },
    {
        id: 'ton3',
        imageSrc: ton3,
        classList: cn(css.ton3, css.imageBlock, css.animationRotateX),
    },
    {
        id: 'bubble2',
        imageSrc: bubble2,
        classList: cn(css.bubble2, css.imageBlock, css.animationBubbleUp),
    },
    {
        id: 'deFi',
        imageSrc: deFi,
        classList: cn(css.defi, css.animationZoomInOut),
    },
    {
        id: 'bubble1',
        imageSrc: bubble1,
        classList: cn(css.bubble1, css.imageBlock, css.animationBubbleUp),
    },
    {
        id: 'bubble3',
        imageSrc: bubble3,
        classList: cn(css.bubble3, css.imageBlock, css.animationBubbleUp),
    },
];

export const StepOne = ({ isStepOne, onClickButton }: StepOneProps) => {
    const title = 'Welcome to the Web3';
    const text =
        'Sit back, invest, and experience the growth of the thriving TON ecosystem.';
    const buttonText = 'Continue';

    return (
        <>
            <ImagesStep isStepOne={isStepOne} imagesStep={imagesStep} />
            <ContentStep
                className={css.stepVisible}
                isStepOne={isStepOne}
                onClickButton={onClickButton}
                title={title}
                text={text}
                buttonText={buttonText}
            />
        </>
    );
};
