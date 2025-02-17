// При заходе у нас будет первое создание - если мы сохранили как драфт (храним в локал сторадже, в будущем отправляем на бек)
// Дальше из списка заходим в нужную стратегию и там нам присылается инфа по каждому шагу

import {
    DocumentIcon,
    CoinsDollarIcon,
    PercentIcon,
    CheckListIcon,
    DepositDollarIcon,
} from '@/components/Icons/Icons.tsx';
import css from './steps.module.css';
import React, { CSSProperties } from 'react';
import cn from 'classnames';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { Link } from 'react-router-dom';

type CustomCSSProperties = CSSProperties & {
    '--width'?: string;
};

interface StepCard {
    id: number;
    name: string;
    icon: React.ReactNode;
    isCompleted: boolean;
    isAllowed: boolean;
    path: string;
}

export const StrategyStepsPage = () => {
    const steps: StepCard[] = [
        {
            id: 1,
            name: 'Strategy basics',
            icon: <DocumentIcon />,
            isCompleted: true,
            isAllowed: true,
            path: '/strategy/basics',
        },
        {
            id: 2,
            name: 'Assets inside',
            icon: <CoinsDollarIcon />,
            isCompleted: true,
            isAllowed: true,
            path: '/strategy/assets-inside',
        },
        {
            id: 3,
            name: 'Fees',
            icon: <PercentIcon />,
            isCompleted: false,
            isAllowed: true,
            path: '/strategy/fees',
        },
        {
            id: 4,
            name: 'Strategy preview',
            icon: <CheckListIcon />,
            isCompleted: false,
            isAllowed: false,
            path: '/strategy/preview',
        },
        {
            id: 5,
            name: 'First investment',
            icon: <DepositDollarIcon />,
            isCompleted: false,
            isAllowed: false,
            path: '/strategy/investment',
        },
    ];

    const currentStep = steps.filter((step) =>
        Boolean(step.isCompleted)
    ).length;

    const progressBarFilledStyle: CustomCSSProperties = {
        ...(currentStep !== 0 && { '--width': `${currentStep * 20}%` }),
    };

    const nextStep =
        steps.find((step) => step.id === currentStep + 1) ?? steps[0];

    const stepCardContent = (step: StepCard) => {
        return (
            <>
                <div
                    className={cn(css.stepCardIcon, {
                        [css.stepCardIconActive]: step.isCompleted,
                    })}
                >
                    {step.icon}
                </div>
                {step.name}
            </>
        );
    };

    return (
        <div className={css.page}>
            <div className="app-container">
                <h1 className={css.title}>Strategy creation</h1>
                <p className={css.subtitle}>
                    Follow 5 easy steps to create your strategy. You can save as
                    a draft at any time and continue later.
                </p>
                <div className={css.stepBarWrapper}>
                    <div className={css.stepBarLabel}>
                        Step {currentStep} of {steps.length}
                    </div>
                    <div className={css.stepBar}>
                        <div
                            className={css.stepBarFilledLine}
                            style={progressBarFilledStyle}
                        ></div>
                    </div>
                </div>
                <div className={css.stepList}>
                    {steps.map((step) =>
                        step.isAllowed ? (
                            <Link
                                key={step.id}
                                className={css.stepCard}
                                to={step.path}
                            >
                                {stepCardContent(step)}
                            </Link>
                        ) : (
                            <div key={step.id} className={css.stepCard}>
                                {stepCardContent(step)}
                            </div>
                        )
                    )}
                </div>
            </div>
            <AppFooter className={css.footerActions}>
                {currentStep === 0 ? (
                    <AppButton label="Start" to={'/strategy/basics'} />
                ) : (
                    <>
                        <AppButton label="Save as draft" type={'secondary'} />
                        <AppButton label="Next step" to={nextStep.path} />
                    </>
                )}
            </AppFooter>
        </div>
    );
};
