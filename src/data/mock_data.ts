import { ETFType } from '@/types.ts';
import firstCardImage from './../assets/images/first_card_image.png';
import secondCardImage from './../assets/images/second_card_image.png';
import lowRisk from './../assets/images/low_risk.png';
import commision from './../assets/images/fee.png';
import Ton from './../assets/icons/Ton.svg?url';
import usdt from './../assets/icons/USDT.svg?url';
import btc from './../assets/icons/Bitcoin.svg?url';

//TODO:retrieve data from BE
export const ETFS_DATA_MOCK: ETFType[] = [
    {
        title: 'ETF Pro',
        jettonSymbol: 'ETFP',
        description: 'Stable fund for long term investment',
        imgUrl: firstCardImage,
        tvl: 1235,
        aprPercent: 10,
        etfPriceChange: 12.76,
        address:
            '0:f00141aafca33401ae5c951721f2091c516aa49d50b4687da2d04d40a0fe115e',
        badgeText: 'MOST POPULAR',
        about: {
            text: 'A DeFi fund is a decentralized financial investment vehicle built on blockchain technology. It enables users to pool capital and invest in a range of decentralized finance (DeFi) protocols, earning returns through yield farming, liquidity provision, staking, and other innovative mechanisms. The fund operates without intermediaries, offering transparency, security, and global accessibility.',
            features: [
                {
                    title: 'Low risk',
                    subTitle: 'Compared to meme coins',
                    image: lowRisk,
                },
                {
                    title: 'Commission 0,5%',
                    subTitle: 'Сoins exchange fee',
                    image: commision,
                },
            ],
        },
        inside: [
            {
                title: 'TON',
                subTitle: 'Toncoin',
                image: Ton,
                numbers: '54%',
            },
            {
                title: 'USDT',
                subTitle: 'Tether USDT',
                image: usdt,
                numbers: '24%',
            },
            {
                title: 'BTC',
                subTitle: 'Bitcoin',
                image: btc,
                numbers: '22%',
            },
        ],
        faq: [
            {
                question: 'Is it safe to invest in the fund?',
                answer: 'All investment data is securely safeguarded by a smart contract, ensuring complete safety and transparency for investors. This decentralized system operates autonomously, minimizing human error and protecting your assets from unauthorized access or manipulation.',
            },
            {
                question: 'How much profit will I make?',
                answer: 'The fund provides a high-returning investment opportunity. The fund is designed to provide stable returns, with a maximum annualized return of 10%.',
            },
            {
                question: 'How can I withdraw money?',
                answer: 'The fund allows investors to withdraw their funds directly from the fund. The fund operates without intermediaries, offering transparency, security, and global accessibility.',
            },
        ],
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
                    image: lowRisk,
                },
                {
                    title: 'Commission 0,5%',
                    subTitle: 'Сoins exchange fee',
                    image: commision,
                },
            ],
        },
        inside: [
            {
                title: 'TON',
                subTitle: 'Toncoin',
                image: Ton,
                numbers: '54%',
            },
            {
                title: 'USDT',
                subTitle: 'Tether USDT',
                image: usdt,
                numbers: '24%',
            },
            {
                title: 'BTC',
                subTitle: 'Bitcoin',
                image: btc,
                numbers: '22%',
            },
        ],
    },
];
