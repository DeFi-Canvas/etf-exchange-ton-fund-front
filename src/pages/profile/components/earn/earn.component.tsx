import css from './earn.module.css';
import { EranStep } from './earn.view-model';

export interface EranProps {
    readonly steps: Array<EranStep>;
}

export const Earn = ({ steps }: EranProps) => {
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
};

const Step = ({ title, reward, externalLink }: EranStep) => {
    return (
        <div className={css.step}>
            <div className={css.info}>
                <span className={css.title}>{title}</span>
                <span className={css.reward}>{reward}</span>
            </div>
            <button className={css.button}>
                <a href={externalLink} target="_blank" rel="noreferrer">
                    Start
                </a>
            </button>
        </div>
    );
};