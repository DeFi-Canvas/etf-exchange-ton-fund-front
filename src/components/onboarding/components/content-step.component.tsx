import cn from 'classnames';
import css from '@/components/onboarding/onboarding.module.css';
import AppButton from '@/components/app-button/app-button.component.tsx';

interface ContentStepProps {
    isStepOne: boolean;
    onClickButton: () => void;
    title: string;
    text: string;
    buttonText: string;
    className?: string;
}

export const ContentStep = ({
    isStepOne,
    onClickButton,
    title,
    text,
    buttonText,
    className,
}: ContentStepProps) => {
    return (
        <div
            className={cn(css.stepContent, className, {
                [css.stepContentHidden]: isStepOne,
            })}
        >
            <h2 className={css.stepContentTitle}>{title}</h2>
            <p className={css.stepContentText}>{text}</p>
            <AppButton
                label={buttonText}
                type="white"
                className={css.stepContentButton}
                onClick={onClickButton}
            />
        </div>
    );
};
