import { pipe } from 'fp-ts/lib/function';
import css from './earn.module.css';
import { EranStep } from './earn.view-model';
import * as E from 'fp-ts/Either';

export interface EranProps {
    readonly steps: E.Either<string, Array<EranStep>>;
}

export const Earn = ({ steps }: EranProps) => {
    const stepRender = pipe(
        steps,
        E.fold(
            () => null,
            (steps) => {
                return (
                    <div className={css.wrap}>
                        <div className={css.titleWrap}>
                            <span>Earn</span>
                            <span className={css.count}>{2}</span>
                        </div>
                        <div className={css.eranSteps}>
                            {steps.map((step) => (
                                <Step key={step.id} {...step} />
                            ))}
                        </div>
                    </div>
                );
            }
        )
    );

    return <>{stepRender}</>;
};

const Step = ({ title, reward, externalLink }: EranStep) => {
    return (
        <div className={css.step}>
            <div className={css.info}>
                <span className={css.title}>{title}</span>
                <span className={css.reward}>+ {reward} TON</span>
            </div>
            <button className={css.button}>
                <a href={externalLink} target="_blank" rel="noreferrer">
                    Start
                </a>
            </button>
        </div>
    );
};
