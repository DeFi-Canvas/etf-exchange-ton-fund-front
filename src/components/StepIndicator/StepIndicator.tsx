import './StepIndicator.scss';

type PropsType = {
    stepNumber: number | string;
};

const StepIndicator = ({ stepNumber }: PropsType) => {
    const progressPercentage = (+stepNumber / 4) * 100;

    const renderStep = () => {
        switch (stepNumber) {
            case '3':
                return 'Final Step';
            default:
                return 'Step ' + stepNumber;
        }
    };
    return (
        <div className="step-indicator--wrapper">
            <p>{renderStep()}</p>
            <div className="step-indicator">
                <div
                    className="step-indicator--progress"
                    style={{ width: `${progressPercentage}%` }} // Set width dynamically
                ></div>
            </div>
        </div>
    );
};

export default StepIndicator;
