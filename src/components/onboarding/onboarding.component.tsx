import { useState } from 'react';
import css from './onboarding.module.css';
import { StepOne } from '@/components/onboarding/components/step-one.component.tsx';
import { StepTwo } from '@/components/onboarding/components/step-two.component.tsx';

export const Onboarding = () => {
    const [isStepOne, setIsSetOne] = useState(false); // default false
    const toStepTwo = () => setIsSetOne(true);
    const toFinish = () => console.log('FINISH!!');

    return (
        <div className={css.page}>
            <StepOne isStepOne={isStepOne} onClickButton={toStepTwo} />
            <StepTwo isStepOne={isStepOne} onClickButton={toFinish} />
        </div>
    );
};
