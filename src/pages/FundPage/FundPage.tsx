import {useParams} from "react-router-dom";
import {etfs_data} from "@/data/mock_data.ts";
import BigCard from "@/components/BigCard/BigCard.tsx";
import RowWithImage from "@/components/RowWithImage/RowWithImage.tsx";
import {AccordionStyled} from "@/components/AccordionStyled/AccordionStyled.tsx";
import {Link} from "@/components/Link/Link.tsx";

import './FundPage.scss'

const FundPage = () => {
  const {id} = useParams()
  const etfData = etfs_data.find(etf => etf.jettonSymbol === id)

  if (!etfData) return <>404</>

  return (
    <div className={'container funds-page'}>
      <h1 className={'funds-page--h1'}>{etfData.title}</h1>
      <BigCard title={'TVL'}><p>Chart</p></BigCard>
      <BigCard title={'About'}>
        <p className={'funds-page--about-text'}>{etfData.about.text}</p>
        <div className={'funds-page--cards-wrapper cards-top8'}>
          {etfData.about?.features?.map((item, index) => <RowWithImage key={index} {...item}/>)}
        </div>
      </BigCard>
      <BigCard title={'What\'s inside'}>
        <div className={'funds-page--cards-wrapper'}>
          {etfData.inside?.map((item, index) => <RowWithImage key={index} {...item}/>)}
        </div>
      </BigCard>
      {etfData.faq && <BigCard title={'FAQ'}>
        <div className={'funds-page--cards-wrapper-faq cards-top4'}>
          {etfData.faq?.map((item, index) => <AccordionStyled isFirst={!!index} key={index} title={item.question}
                                                              content={item.answer}/>
          )}
        </div>
      </BigCard>}
      <Link to={'/terms'} className={'funds-page--terms'}>Terms & conditions</Link>
    </div>
);
};

export default FundPage;