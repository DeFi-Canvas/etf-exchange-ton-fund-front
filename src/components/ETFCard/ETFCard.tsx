import './ETFCard.scss'
import BadgeSmall from "@/components/BadgeSmall/BadgeSmall.tsx";
import BigBadge from "@/components/BigBadge/BigBadge.tsx";
import {Link} from "@/components/Link/Link.tsx";

type PropsType = {
  title: string
  description: string
  imgUrl: string
  tvl?: number
  personEtfBalance?: number
  aprPercent?: number
  etfPriceChange?: number
  isDisabled?: boolean
  badgeText?: string
  etfURL: string
}

const EtfCard = ({
                   description,
                   title,
                   imgUrl,
                   tvl,
                   personEtfBalance,
                   aprPercent,
                   etfPriceChange,
                   badgeText, etfURL
                 }: PropsType) => {


  return (
    <Link to={etfURL} className={'etf-card'}>
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