import SkeletonCardBlock from '../components/skeleton-card-block/skeleton-card-block.component';
import SkeletonCardLine from '../components/skeleton-card-line/skeleton-card-line.component';
import css from './skeleton-asset-card.module.css';

const SkeletonAssetCard = () => {
    return (
        <div className={css.assetCard}>
            <SkeletonCardBlock />
            <div className={css.assetCardContent}>
                <SkeletonCardLine height={22} />
                <SkeletonCardLine />
            </div>
        </div>
    );
};

export default SkeletonAssetCard;
