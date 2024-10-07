import {useParams} from "react-router-dom";
import InvestStep1 from "@/pages/InvestPage/steps/InvestStep1.tsx";
import InvestStep2 from "@/pages/InvestPage/steps/InvestStep2.tsx";
import InvestStep3 from "@/pages/InvestPage/steps/InvestStep3.tsx";
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import StepIndicator from "@/components/StepIndicator/StepIndicator.tsx";
import {useEffect} from "react";
import {dispatch} from "@/store";
import {setInvestStep, setSelectedCoinToInvest} from "@/store/reducers/appSlice.ts";

const InvestPage = () => {
  const investStep = useAppSelector(state => state.appSlice.investStep)
  const {id} = useParams()

  if (!id) return <>404</>

  const renderSteps = () => {
    switch (investStep) {
      case 1:
        return <InvestStep1/>
      case 2:
        return <InvestStep2/>
      case 3:
        return <InvestStep3/>
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setSelectedCoinToInvest(''))
      dispatch(setInvestStep(1))
    }
  }, []);

  return (
    <main className={'container invest-steps'}>
      <StepIndicator stepNumber={investStep}/>
      {
        renderSteps()
      }
      {id}
    </main>
  );
};

export default InvestPage;