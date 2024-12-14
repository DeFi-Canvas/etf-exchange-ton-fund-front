import cn from 'classnames';
import css from '../onboarding.module.css';
// Templates
import { ImagesStep } from './images-step.component.tsx';
import { ContentStep } from './content-step.component.tsx';
// Images
import storm from '@/assets/images/onboarding/step-two/storm.png';
import coin from '@/assets/images/onboarding/step-two/coin.png';
import bubbles from '@/assets/images/onboarding/step-two/bubbles.png';
import caseImg from '@/assets/images/onboarding/step-two/case.png';
import coffee from '@/assets/images/onboarding/step-two/coffee.png';
import ton from '@/assets/images/onboarding/step-two/ton.png';
import tonStake from '@/assets/images/onboarding/step-two/ton-stake.png';

interface StepTwoProps {
    isStepOne: boolean;
    onClickButton: () => void;
}

const imagesStep = [
    {
        id: 'storm',
        imageSrc: storm,
        classList: cn(css.storm, css.imageBlock, css.animationRotateX),
    },
    {
        id: 'coin',
        imageSrc: coin,
        classList: cn(css.coin, css.imageBlock, css.animationRotateX),
    },
    {
        id: 'bubbles',
        imageSrc: bubbles,
        classList: cn(css.bubbles, css.imageBlock, css.animationBubbleUp),
    },
    {
        id: 'caseImg',
        imageSrc: caseImg,
        classList: cn(css.case, css.animationZoomInOut),
    },
    {
        id: 'coffee',
        imageSrc: coffee,
        classList: cn(css.coffee, css.imageBlock, css.animationRotateX),
    },
    {
        id: 'ton',
        imageSrc: ton,
        classList: cn(css.ton, css.imageBlock, css.animationRotateX),
    },
    {
        id: 'tonStake',
        imageSrc: tonStake,
        classList: cn(css.tonStake, css.imageBlock, css.animationRotateX),
    },
];

export const StepTwo = ({ isStepOne, onClickButton }: StepTwoProps) => {
    const title = 'Dive into investing';
    const text =
        'Earn rewards for simple tasks and start your journey as an investor.';
    const buttonText = 'Start investing';

    return (
        <>
            <ImagesStep
                isStepOne={!isStepOne}
                imagesStep={imagesStep}
                className={css.stepTwo}
            />
            <ContentStep
                isStepOne={!isStepOne}
                onClickButton={onClickButton}
                title={title}
                text={text}
                buttonText={buttonText}
            />
        </>
    );
};
