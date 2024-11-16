import { pipe } from 'fp-ts/lib/function';
import css from './earn.module.css';
import { EranStep } from './earn.view-model';
import * as E from 'fp-ts/Either';
import cn from 'classnames';
import { SuccessWhiteSolidIcon } from '@/components/Icons/Icons.tsx';

export interface EranProps {
    readonly steps: E.Either<string, Array<EranStep>>;
    readonly checkStep: (id: string) => void;
}

export const Earn = ({ steps, checkStep }: EranProps) => {
    const stepRender = pipe(
        steps,
        E.fold(
            // TODO: использовать нужную эмоцию а именно показывать сккелетон пока грузятся данные (релевантно ко всем подобным кейсам)
            () => null,
            (steps) => {
                return (
                    <div className={css.cardWrapper}>
                        <div className="app-container">
                            <div className={css.cardTitle}>
                                <span>Earn Test TON</span>
                                <div className={css.cardTitleCounter}>{steps.length}</div>
                            </div>

                            <div className={css.cardSteps}>
                                {steps.map((step) => (
                                    <Step
                                        key={step.id}
                                        {...step}
                                        checkStep={checkStep}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
        )
    );

    return <>{stepRender}</>;
};

interface StepProps extends EranStep {
    readonly checkStep: (id: string) => void;
}

const Step = ({
    title,
    reward,
    externalLink,
    checkStep,
    id,
    isActive,
}: StepProps) => {
    return (
        <div className={cn(css.step, { [css.stepDone]: isActive })}>
            <div className={css.stepInfo}>
                <span>{title}</span>
                <span className={css.stepInfoReward}>{ `+${reward}` } TON</span>
            </div>

            {
                isActive ? 
                    <div className={ css.stepButton }>
                        <SuccessWhiteSolidIcon />
                    </div> 
                    :
                    <div className={css.stepButton} onClick={() => checkStep(id)}>
                        <a href={externalLink} className={ css.stepButtonText } target="_blank" rel="noreferrer">
                            Start
                        </a>
                    </div>
            }
        </div>
    );
};
