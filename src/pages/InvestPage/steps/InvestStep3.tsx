import ReactPlayer from 'react-player'
import ton from '@/assets/video/ton.mp4';


const InvestStep3 = () => {

  return (
    <div className={'invest-steps--content'}>
      <div className={'invest-steps--content-text'}>
        <h2>All is almost done</h2>
        <p>Only one step left to convert your coins into an income-generating ETF. Swipe to sign the transaction.</p>
      </div>
      <ReactPlayer playing width={240} height={190}  url={ton} />
    </div>
  );
};

export default InvestStep3;