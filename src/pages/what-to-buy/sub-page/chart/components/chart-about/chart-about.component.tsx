import { FeeIcon, RiskLowIcon } from '@/components/Icons/Icons';
import css from './chart-about.module.css';

const ChartAbout = () => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>About</div>
            <div className={css.cardContent}>
                A DeFi fund is a decentralized financial investment vehicle
                built on blockchain technology. It enables users to pool capital
                and invest in a range of decentralized finance (DeFi) protocols,
                earning returns through yield farming, liquidity provision,
                staking, and other innovative mechanisms. The fund operates
                without intermediaries, offering transparency, security, and
                global accessibility.
            </div>
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
                        <div className={css.cardInfoTitle}>Commission 0,5%</div>
                        <div className={css.cardInfoSubTitle}>
                            Coins exchange fee
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartAbout;
