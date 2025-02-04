import { trackTelemetree } from '@/telemetree/telemetree-entry';
import css from './card-author.module.css';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

const CardAuthor = () => {
    const eventBuilder = useTWAEvent();

    return (
        <div className={css.card}>
            <div className={css.cardTitle}>Author</div>
            <div
                className={css.cardContent}
                onClick={() => {
                    trackTelemetree(
                        eventBuilder,
                        'WHAT_TO_BUY_PAGE: author click'
                    );
                }}
            >
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

export default CardAuthor;
