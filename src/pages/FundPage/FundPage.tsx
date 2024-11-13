import { useParams } from 'react-router-dom';
import { ETFS_DATA_MOCK } from '@/data/mock_data.ts';
import BigCard from '@/components/BigCard/BigCard.tsx';
import RowWithImage from '@/components/RowWithImage/RowWithImage.tsx';
import { AccordionStyled } from '@/components/AccordionStyled/AccordionStyled.tsx';
import { Link } from '@/components/Link/Link.tsx';
import FundChart from '@/components/FundChart/FundChart.tsx';
import { UpIcon } from '@/components/Icons/Icons.tsx';

import './FundPage.scss';

const FundPage = () => {
    const { id } = useParams();
    const etfData = ETFS_DATA_MOCK.find((etf) => etf.jettonSymbol === id);

    if (!etfData) return <>404</>;

    return (
        <div className={'funds-page'}>
            <h1 className={'funds-page--h1'}>{etfData.title}</h1>
            {id === 'ETFP' && (
                <BigCard>
                    <div className={'fund-page--chart-text'}>
                        <div>
                            <h3>TVL: $1234</h3>
                            <p>
                                <UpIcon /> 12,54%
                            </p>
                        </div>
                        <h2 className={'fund-page--chart-text-apr'}>APR: 5%</h2>
                    </div>
                    <FundChart />
                </BigCard>
            )}
            <BigCard title={'About'}>
                <p className={'funds-page--about-text'}>{etfData.about.text}</p>
                <div className={'funds-page--cards-wrapper cards-top8'}>
                    {etfData.about?.features?.map((item, index) => (
                        <RowWithImage key={index} {...item} />
                    ))}
                </div>
            </BigCard>
            <BigCard title={"What's inside"}>
                <div className={'funds-page--cards-wrapper'}>
                    {etfData.inside?.map((item, index) => (
                        <RowWithImage key={index} {...item} />
                    ))}
                </div>
            </BigCard>
            {etfData.faq && (
                <BigCard title={'FAQ'}>
                    <div className={'funds-page--cards-wrapper-faq cards-top4'}>
                        {etfData.faq?.map((item, index) => (
                            <AccordionStyled
                                isFirst={!!index}
                                key={index}
                                title={item.question}
                                content={item.answer}
                            />
                        ))}
                    </div>
                </BigCard>
            )}
            <Link to={'/terms'} className={'funds-page--terms'}>
                Terms & conditions
            </Link>
        </div>
    );
};

export default FundPage;
