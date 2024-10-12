import './OnboardScreen.scss'
import {useEffect, useState} from "react";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.tsx";
import fist_step from '@/assets/images/first_step.png';
import second_step from '@/assets/images/second_step.png';
import third_step from '@/assets/images/third_step.png';
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {setAppStatus} from "@/store/reducers/appSlice.ts";
import {useTonConnectModal} from "@tonconnect/ui-react";

const screens = [{
  img: fist_step,
  text: <p><span>Welcome to DeFi Canvas!</span><br/> Investing is now as easy as making a tap</p>,
  button: (onClick: () => void) => <ButtonPrimary text={'Continue'} onClick={onClick}/>
},
  {
    img: second_step,
    text: <p><span>Safely invest</span> in indices, deposits and modern instruments selected by professionals with a
      single click</p>,
    button: (onClick: () => void) => <ButtonPrimary text={'Continue'} onClick={onClick}/>
  }, {
    img: third_step,
    text: <p><span>Connect your wallet</span> and plunge into the world of investments now</p>,
    button: (onClick: () => void) => <ButtonPrimary text={'Connect wallet'} className={'onboard-screen--button'}
                                                    onClick={onClick}/>,
    secondaryButton: (onClick: () => void) => <ButtonPrimary text={'Maybe later'}
                                                             className={'onboard-screen--button-secondary'}
                                                             onClick={onClick}/>
  },
]


const OnbardScreen = () => {
  const dispatch = useAppDispatch()
  const [step, setStep] = useState(0)
  const {open, state} = useTonConnectModal();

  console.log(state)


  const screenData = screens[step]
  const onClick = () => {
    step === 2 ? open() : setStep(step + 1)
  }
  const onSecondaryClick = () => {
    dispatch(setAppStatus('idle'))
  }

  useEffect(() => {
   if(state && state.closeReason === 'wallet-selected')  {
     dispatch(setAppStatus('idle'))
   }
  }, [state]);

  return (
    <div className={'onboard-screen'}>
      <img src={screenData.img} alt="image" className={'onboard-screen--image'}/>
      <div className={'onboard-screen--content'}>
        {screenData.text}
      </div>
      <div className={'onboard-screen--button'}>
        {screenData?.secondaryButton && screenData.secondaryButton(onSecondaryClick)}
        {screenData.button(onClick)}
      </div>
    </div>
  );
};

export default OnbardScreen;