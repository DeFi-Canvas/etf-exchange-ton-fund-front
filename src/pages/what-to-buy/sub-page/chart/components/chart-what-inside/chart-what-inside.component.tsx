import css from './chart-what-inside.module.css';

const ChartWhatInside = () => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>What's inside</div>
            <div className={css.cardContent}>
                <div className={css.cardItem}>
                    <img src="temp-ton.png" className={css.cardItemImage} />
                    <div className={css.cardContentInfo}>
                        <div className={css.cardContentInfoTitle}>TON</div>
                        <div className={css.cardContentInfoSubTitle}>
                            Toncoin
                        </div>
                    </div>
                    <div className={css.cardContentInfoValue}>54%</div>
                </div>
                <div className={css.cardItem}>
                    <img
                        src="temp-usdt-coin.png"
                        className={css.cardItemImage}
                    />
                    <div className={css.cardContentInfo}>
                        <div className={css.cardContentInfoTitle}>USDT</div>
                        <div className={css.cardContentInfoSubTitle}>
                            Tether USDT
                        </div>
                    </div>
                    <div className={css.cardContentInfoValue}>24%</div>
                </div>
                <div className={css.cardItem}>
                    <img
                        src="temp-btc-coin.png"
                        className={css.cardItemImage}
                    />
                    <div className={css.cardContentInfo}>
                        <div className={css.cardContentInfoTitle}>BTC</div>
                        <div className={css.cardContentInfoSubTitle}>
                            Bitcoin
                        </div>
                    </div>
                    <div className={css.cardContentInfoValue}>22%</div>
                </div>
            </div>
        </div>
    );
};

export default ChartWhatInside;
