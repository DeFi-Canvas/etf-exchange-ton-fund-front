import css from './earn.module.css';
import { EranStep } from './earn.view-model';
import * as E from 'fp-ts/Either';
import cn from 'classnames';
import { SuccessWhiteSolidIcon } from '@/components/Icons/Icons.tsx';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonSmallCard from '@/components/skeletons/components/skeleton-small-card/skeleton-smal-card.component';

export interface EranProps {
    readonly steps: E.Either<string, Array<EranStep>>;
    readonly checkStep: (id: string) => void;
}

export const Earn = ({ steps, checkStep }: EranProps) => {
    const stepLength = E.isRight(steps) ? steps.right.length : 0;
    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <div className={css.cardTitle}>
                    <span>Earn Test TON</span>
                    <div className={css.cardTitleCounter}>{stepLength}</div>
                </div>

                <div className={css.cardSteps}>
                    <RenderResult
                        data={steps}
                        success={(steps) => (
                            <>
                                {steps.map((step) => (
                                    <Step
                                        {...step}
                                        checkStep={checkStep}
                                        key={step.id}
                                    />
                                ))}
                            </>
                        )}
                        loading={() => (
                            <>
                                <SkeletonSmallCard />
                                <SkeletonSmallCard />
                                <SkeletonSmallCard />
                                <SkeletonSmallCard />
                            </>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

interface StepProps extends EranStep {
    readonly checkStep: (id: string) => void;
}

// TODO: isLoading доступна
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
                <span className={css.stepInfoReward}>{`+${reward}`} TON</span>
            </div>

            {isActive ? (
                <div className={css.stepButton}>
                    <SuccessWhiteSolidIcon />
                </div>
            ) : (
                <div
                    className={cn(css.stepButton)}
                    onClick={() => checkStep(id)}
                >
                    <a
                        href={externalLink}
                        className={css.stepButtonText}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Start
                    </a>
                </div>
            )}
        </div>
    );
};
