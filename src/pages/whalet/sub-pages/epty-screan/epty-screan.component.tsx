import SkeletonAssetCard from '@/components/skeletons/skeleton-asset-card/skeleton-asset-card.component';
import css from './epty-screan.module.css';

interface EmptyScreanProps {
    emptyGif: string;
    text: string;
    footerSlot: () => React.ReactNode;
}

export const EmptyScrean = ({
    emptyGif,
    text,
    footerSlot,
}: EmptyScreanProps) => {
    return (
        <div className={css.wrapEmptyScrean}>
            <SkeletonAssetCard />
            <img src={emptyGif} alt="nothig found" />
            <p className={css.text}>{text}</p>
            {footerSlot()}
        </div>
    );
};
