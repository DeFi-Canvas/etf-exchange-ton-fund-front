import { pipe } from 'fp-ts/lib/function';
import css from './earn.module.css';
import { EranStep } from './earn.view-model';
import * as E from 'fp-ts/Either';
import cn from 'classnames';

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
                    <div className={css.wrap}>
                        <div className={css.titleWrap}>
                            <span>Earn</span>
                            <span className={css.count}>{steps.length}</span>
                        </div>
                        <div className={css.eranSteps}>
                            {steps.map((step) => (
                                <Step
                                    key={step.id}
                                    {...step}
                                    checkStep={checkStep}
                                />
                            ))}
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

// TODO: isActive - та пропса на которую можно опираться по стилям
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
            <div className={css.info}>
                <span className={css.title}>{title}</span>
                <span className={css.reward}>+ {reward} TON</span>
            </div>
            <button className={css.button} onClick={() => checkStep(id)}>
                <a href={externalLink} target="_blank" rel="noreferrer">
                    Start
                </a>
            </button>
        </div>
    );
};
