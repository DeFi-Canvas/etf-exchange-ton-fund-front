import cn from 'classnames';
import css from '@/components/onboarding/onboarding.module.css';

interface imageStep {
    id: string;
    imageSrc: string;
    classList: string;
}

interface ImagesStepProps {
    isStepOne: boolean;
    imagesStep: imageStep[];
    className?: string;
}

export const ImagesStep = ({
    isStepOne,
    imagesStep,
    className = '',
}: ImagesStepProps) => {
    return (
        <div
            className={cn(css.step, className, { [css.stepHidden]: isStepOne })}
        >
            {imagesStep.map((imageStep) => (
                <img
                    src={imageStep.imageSrc}
                    className={imageStep.classList}
                    key={imageStep.id}
                    alt="Decor"
                />
            ))}
        </div>
    );
};
