import css from './skeleton-medium-card.module.css';
import SkeletonLine from '../skeleton-line/skeleton-line.component';
import SkeletonBlock from '../skeleton-block/skeleton-block.component';

const SkeletonMediumCard = () => {
    return (
        <div className={css.card}>
            <header className={css.cardHeader}>
                <div className={css.cardHeaderTop}>
                    <SkeletonLine className={css.cardHeaderTitle} />
                    <div className={css.cardHeaderMore}>
                        <SkeletonBlock size={20} />
                        <SkeletonBlock size={20} />
                        <SkeletonBlock size={20} />
                    </div>
                </div>
                <div>
                    <SkeletonLine height={21} />
                    <SkeletonLine
                        className={css.cardHeaderSubTitle}
                        height={22}
                    />
                    <SkeletonLine
                        className={css.cardHeaderButton}
                        height={22}
                    />
                </div>
            </header>
            <div className={css.cardBody}>
                <SkeletonLine height={26} />
                <SkeletonLine height={21} className={css.cardBodySubTitle} />
                <SkeletonLine height={63} className={css.cardBodyInfo} />
            </div>
        </div>
    );
};

export default SkeletonMediumCard;
