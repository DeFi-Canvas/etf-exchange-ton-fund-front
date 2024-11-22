import css from './chart-more-info.module.css';

interface ChartMoreInfoCardInterface {
    id: number;
    title: string;
    value: string;
}

const ChartMoreInfo = () => {
    const cards: ChartMoreInfoCardInterface[] = [
        {
            id: 1,
            title: 'Invested',
            value: 'Up to $100 000',
        },
        {
            id: 2,
            title: 'Value',
            value: '$ 1,56',
        },
        {
            id: 3,
            title: 'People follow',
            value: '264',
        },
        {
            id: 4,
            title: 'Age',
            value: '5 months',
        },
    ];

    return (
        <div className={css.card}>
            <div className={css.cardTitle}>More info</div>
            <div className={css.cardContent}>
                {cards.map((card) => (
                    <div className={css.cardContentItem}>
                        <div className={css.cardContentItemTitle}>
                            {card.title}
                        </div>
                        <div className={css.cardContentItemValue}>
                            {card.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartMoreInfo;
