import './ETFCard.scss'
import BadgeSmall from "@/components/BadgeSmall/BadgeSmall.tsx";
import BigBadge from "@/components/BigBadge/BigBadge.tsx";
import {Link} from "@/components/Link/Link.tsx";
import {ETFType} from "@/types.ts";

type PropsType = ETFType & {
  personEtfBalance?: number
  isDisabled?: boolean
}

const EtfCard = ({
                   description,
                   title,
                   imgUrl,
                   tvl,
                   personEtfBalance,
                   aprPercent,
                   etfPriceChange,
                   badgeText, jettonSymbol
                 }: PropsType) => {


  return (
    <Link to={`/funds/${jettonSymbol}`} className={'etf-card'}>
      {badgeText && <BigBadge text={badgeText} className={'etf-card-badge'}/>}
      <div className={'etf-card-img'}><img src={imgUrl} alt={`${title}`}/></div>
      <div className={'etf-card--middle'}>
        <div className={'etf-card--middle-title'}>
          <h2>{title}</h2>
          {tvl && <p>TVL: $ {tvl}</p>}
        </div>
        <p className={'etf-card--middle-description'}>{description}</p>
      </div>
      {personEtfBalance !== undefined && etfPriceChange !== undefined && <div className={'etf-card--bottom'}>
          <div className={'etf-card--bottom-balance'}>
              <h3>Your balance:</h3>
              <p>$ {personEtfBalance.toFixed(2)}</p>
          </div>
          <div className={'etf-card--bottom-apr'}>
              <p>APR: {aprPercent}%</p>
              <BadgeSmall value={etfPriceChange}/>
          </div>
      </div>}
    </Link>
  );
};

export default EtfCard;