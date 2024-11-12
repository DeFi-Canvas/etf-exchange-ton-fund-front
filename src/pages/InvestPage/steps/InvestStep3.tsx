// import ReactPlayer from 'react-player';
// import ton from '@/assets/video/ton.mp4';
// import { RightIcon } from '@/components/Icons/Icons.tsx';
// import { useAppSelector } from '@/hooks/useAppSelector.ts';
// import { useLocation } from 'react-router-dom';

// const InvestStep3 = () => {
//     const pathname = useLocation().pathname;
//     const fund = pathname.split('/')[2];

//     const { selectedCoinToInvest } = useAppSelector((state) => state.appSlice);

//     return (
//         <div className={'invest-steps--content'}>
//             <div className={'invest-steps--content-text'}>
//                 <h2>All is almost done</h2>
//                 <p>
//                     Only one step left to convert your coins into an
//                     income-generating ETF. Swipe to sign the transaction.
//                 </p>
//             </div>
//             <ReactPlayer
//                 playsinline
//                 playing
//                 width={240}
//                 height={190}
//                 url={ton}
//             />
//             <div className={'invest-steps-swap'}>
//                 <div>
//                     <span>{selectedCoinToInvest}</span>
//                 </div>
//                 <RightIcon />
//                 <div>
//                     <span>{fund.toUpperCase()}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InvestStep3;
