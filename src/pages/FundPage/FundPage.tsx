import {useParams} from "react-router-dom";
import {etfs_data} from "@/data/mock_data.ts";
import BigCard from "@/components/BigCard/BigCard.tsx";

import './FundPage.scss'

const FundPage = () => {
  const {id} = useParams()
  const etfData = etfs_data.find(etf => etf.jettonSymbol === id)

  if (!etfData) return <>404</>

  return (
    <main className={'container'}>
      <h1 className={'funds-page--h1'}>{etfData.title}</h1>
      <div>chart</div>
      <BigCard title={'About'}>
        <p className={'funds-page--about-text'}>{etfData.about.text}</p>
        <div>
          {etfData.about?.features?.map((item, index) => <p key={index}>{item.title}</p>)}
        </div>
      </BigCard>
    </main>
  );
};

export default FundPage;