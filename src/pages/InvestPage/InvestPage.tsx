import {useLocation, useNavigate, useParams} from "react-router-dom";
import InvestStep1 from "@/pages/InvestPage/steps/InvestStep1.tsx";
import InvestStep2 from "@/pages/InvestPage/steps/InvestStep2.tsx";
import InvestStep3 from "@/pages/InvestPage/steps/InvestStep3.tsx";
import StepIndicator from "@/components/StepIndicator/StepIndicator.tsx";
import {useEffect} from "react";
import {dispatch} from "@/store";
import {setSelectedCoinToInvest} from "@/store/reducers/appSlice.ts";
import {useAppSelector} from "@/hooks/useAppSelector";
import InvestStepFinal from "@/pages/InvestPage/steps/InvestStepFinal.tsx";

const InvestPage = () => {
  const pathname = useLocation().pathname
  const fund = pathname.split('/')[2]
  const navigator = useNavigate()
  const {wallet_info} = useAppSelector(state => state.appSlice)
  const {id, step} = useParams()

  if (!id) return <>404</>

  const renderSteps = () => {
    switch (step) {
      case '1':
        return <InvestStep1/>
      case '2':
        return <InvestStep2/>
      case '3':
        return <InvestStep3/>
      case 'final':
        return <InvestStepFinal />
    }
  }

  useEffect(() => {
    !wallet_info  && navigator(`/funds/${fund}`)
    return () => {
      dispatch(setSelectedCoinToInvest(''))
    }
  }, []);

  return (
    <main className={'container invest-steps'}>
      {step !== 'final' && <StepIndicator stepNumber={step ?? 1}/>}
      {
        renderSteps()
      }
    </main>
  );
};

export default InvestPage;