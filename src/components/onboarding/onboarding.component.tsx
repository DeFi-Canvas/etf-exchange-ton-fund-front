import { useState } from 'react';
import css from './onboarding.module.css';
import { StepOne } from '@/components/onboarding/components/step-one.component.tsx';
import { StepTwo } from '@/components/onboarding/components/step-two.component.tsx';
import cn from 'classnames';

export const Onboarding = () => {
    const [isStepOne, setIsSetOne] = useState(false);
    const [isOnboardingShown, setIsOnboardingShown] = useState(true);

    const toStepTwo = () => setIsSetOne(true);
    const toFinish = () => {
        localStorage.setItem('isOnboardingShown', 'false');
        setIsOnboardingShown(false);
    };

    return (
        <div
            className={cn(css.page, { [css.pageSlideUp]: !isOnboardingShown })}
        >
            <StepOne isStepOne={isStepOne} onClickButton={toStepTwo} />
            <StepTwo isStepOne={isStepOne} onClickButton={toFinish} />
        </div>
    );
};
