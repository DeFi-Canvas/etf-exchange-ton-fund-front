import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import css from './more-info.module.css';
import * as E from 'fp-ts/Either';
import { getUuid } from '@/utils/uuid';

export interface ChartMoreInfoCardInterface {
    id: number;
    title: string;
    value: string;
}

interface MoreInfoProps {
    cards: Array<E.Either<string, ChartMoreInfoCardInterface>>;
}

const MoreInfo = ({ cards }: MoreInfoProps) => {
    return (
        <div className={css.card}>
            <div className={css.cardTitle}>More info</div>
            <div className={css.cardContent}>
                {cards.map((card) => (
                    <RenderResult
                        key={getUuid()}
                        data={card}
                        success={(card) => (
                            <div className={css.cardContentItem} key={card.id}>
                                <div className={css.cardContentItemTitle}>
                                    {card.title}
                                </div>
                                <div className={css.cardContentItemValue}>
                                    {card.value}
                                </div>
                            </div>
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default MoreInfo;
