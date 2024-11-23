import css from './skeleton-fund-card.module.css';
import SkeletonCardLine from '../components/skeleton-card-line/skeleton-card-line.component';
import SkeletonCardBlock from '../components/skeleton-card-block/skeleton-card-block.component';

const SkeletonFunCard = () => {
    return (
        <div className={css.card}>
            <header className={css.cardHeader}>
                <div className={css.cardHeaderTop}>
                    <SkeletonCardLine className={css.cardHeaderTitle} />
                    <div className={css.cardHeaderMore}>
                        <SkeletonCardBlock size={20} />
                        <SkeletonCardBlock size={20} />
                        <SkeletonCardBlock size={20} />
                    </div>
                </div>
                <div>
                    <SkeletonCardLine height={21} />
                    <SkeletonCardLine
                        className={css.cardHeaderSubTitle}
                        height={22}
                    />
                    <SkeletonCardLine
                        className={css.cardHeaderButton}
                        height={22}
                    />
                </div>
            </header>
            <div className={css.cardBody}>
                <SkeletonCardLine height={26} />
                <SkeletonCardLine
                    height={21}
                    className={css.cardBodySubTitle}
                />
                <SkeletonCardLine height={63} className={css.cardBodyInfo} />
            </div>
        </div>
    );
};

export default SkeletonFunCard;
