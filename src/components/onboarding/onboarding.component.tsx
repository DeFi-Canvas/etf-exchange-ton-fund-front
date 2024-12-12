import css from './onboarding.module.css';
// Images
import deFi from '@/assets/images/onboarding/step-one/de-fI.png';
import ton1 from '@/assets/images/onboarding/step-one/ton1.png';
import ton2 from '@/assets/images/onboarding/step-one/ton2.png';
import ton3 from '@/assets/images/onboarding/step-one/ton3.png';
import bubble1 from '@/assets/images/onboarding/step-one/bubble1.png';
import bubble2 from '@/assets/images/onboarding/step-one/bubble2.png';
import bubble3 from '@/assets/images/onboarding/step-one/bubble3.png';

export const Onboarding = () => {
    return (
        <div className={css.page}>
            <div className={css.step}>
                <img src={deFi} className={css.defi} />
                <img src={ton1} className={css.ton1} />
                <img src={ton2} className={css.ton2} />
                <img src={ton3} className={css.ton3} />
                <img src={bubble1} className={css.bubble1} />
                <img src={bubble2} className={css.bubble2} />
                <img src={bubble3} className={css.bubble3} />
            </div>
        </div>
    );
};
