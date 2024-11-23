import css from './card-author.module.css';

const ChartCardAuthor = () => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>Author</div>
            <div className={css.cardContent}>
                <div className={css.authorCard}>
                    <img src="temp-avatar.png" className={css.authorImage} />
                    <div className={css.authorContent}>
                        <div className={css.authorTitle}>Defi Canvas</div>
                        <div className={css.authorSubTitle}>
                            Investing since 2018
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartCardAuthor;
