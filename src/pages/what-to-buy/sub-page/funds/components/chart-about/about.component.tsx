import { FeeIcon, RiskLowIcon } from '@/components/Icons/Icons';
import css from './about.module.css';

interface ChartAboutProps {
    description: string;
    fee: number;
}

const About = ({ description, fee }: ChartAboutProps) => {
    return (
        <div className={css.card}>
            <input type="text" />
            <div className={css.cardTitle}>About</div>
            <div className={css.cardContent}>{description}</div>
            <div className={css.cardInfoWrapper}>
                <div className={css.cardInfoItem}>
                    <RiskLowIcon className={css.icon} />
                    <div className={css.cardInfoItemContent}>
                        <div className={css.cardInfoTitle}>Low risk</div>
                        <div className={css.cardInfoSubTitle}>
                            Compared to meme coins
                        </div>
                    </div>
                </div>
                <div className={css.cardInfoItem}>
                    <FeeIcon className={css.icon} />
                    <div className={css.cardInfoItemContent}>
                        <div className={css.cardInfoTitle}>
                            Commission {fee}%
                        </div>
                        <div className={css.cardInfoSubTitle}>
                            Coins exchange fee
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
