import SkeletonBlock from '../skeleton-block/skeleton-block.component'
import SkeletonLine from '../skeleton-line/skeleton-line.component';
import css from './skeleton-small-card.module.css';

const SkeletonSmallCard = () => {
    return (
        <div className={css.assetCard}>
            <SkeletonBlock />
            <div className={css.assetCardContent}>
                <SkeletonLine height={22} />
                <SkeletonLine />
            </div>
        </div>
    );
};

export default SkeletonSmallCard;
