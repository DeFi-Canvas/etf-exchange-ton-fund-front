import FundChart from "@/components/FundChart/FundChart.tsx";
import BigCard from "@/components/BigCard/BigCard.tsx";
import {UpIcon} from "@/components/Icons/Icons.tsx";

import './AboutPage.scss'
import EtfCard from "@/components/ETFCard/ETFCard.tsx";
import {etfs_data} from "@/data/mock_data.ts";

const AboutPage = () => {

  return (
    <section className={'container'}>
      <BigCard>
        <div className={'about-page--chart-text'}>
            <h3>Total in vault</h3>
            <h2>TVL: $1234</h2>
            <p><UpIcon/> 12,54%</p>
        </div>
        <FundChart/>
      </BigCard>

      <article className={'about-page--article'}>
        <h2>All fund</h2>
        <div className={'about-page--article--etfs'}>
          {etfs_data.map((fund, index) => <EtfCard key={index} {...fund}/>)}
        </div>
      </article>
    </section>
  );
};

export default AboutPage;