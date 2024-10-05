import {ETFType} from "@/types.ts";
import firstCardImage from './../assets/images/first_card_image.png'
import secondCardImage from './../assets/images/second_card_image.png'

export const etfs_data: ETFType[] = [
  {
    title: 'ETF Pro',
    jettonSymbol: 'ETFP',
    description: 'Stable fund for long term investment',
    imgUrl: firstCardImage,
    tvl: 1235,
    aprPercent: 10,
    etfPriceChange: 12.76,
    badgeText: 'MOST POPULAR',
    about: {
      text: 'A DeFi fund is a decentralized financial investment vehicle built on blockchain technology. It enables users to pool capital and invest in a range of decentralized finance (DeFi) protocols, earning returns through yield farming, liquidity provision, staking, and other innovative mechanisms. The fund operates without intermediaries, offering transparency, security, and global accessibility.',
      features: [
        {
          title: 'Low risk',
          subTitle: 'Compared to meme coins',
          image: 'https://img.icons8.com/color/48/000000/low-risk.png'
        },
        {
          title: 'Commission 0,5%',
          subTitle: 'Сoins exchange fee',
          image: 'https://img.icons8.com/color/48/000000/low-risk.png'
        }
      ]
    }
  },
  {
    jettonSymbol: 'ETFMEMES',
    title: 'Memes',
    description: 'For those of you who like memes',
    imgUrl: secondCardImage,
    badgeText: 'COMING SOON',
    about: {
      text: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, consectetur.',
      features: [
        {
          title: 'Low risk',
          subTitle: 'Compared to meme coins',
          image: 'https://img.icons8.com/color/48/000000/low-risk.png'
        },
        {
          title: 'Commission 0,5%',
          subTitle: 'Сoins exchange fee',
          image: 'https://img.icons8.com/color/48/000000/low-risk.png'
        }
      ]
    }
  }
]





