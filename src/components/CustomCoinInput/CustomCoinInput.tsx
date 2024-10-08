import {JettonType} from "@/types.ts";
import AutowidthInput from "react-autowidth-input";
import './CustomCoinInput.scss'

type PropsType = {
  selectedCoin: JettonType
  value: number
  onChange: (value: number) => void
}


const CustomCoinInput = ({selectedCoin, onChange, value}:PropsType) => {

  return (
    <div className={'custom-coin-input'} >
      <div className={'custom-coin-input__title'}>
        <div className={'custom-coin-input__input'}>
          <AutowidthInput  value={value} min={1} type={"number"} onChange={(e) => {
            onChange(+e.target.value)
          }}/>
        </div>
        <p>{selectedCoin?.name}</p>
      </div>
      <p>{value === 0 ? `1 ${selectedCoin?.symbol} ≈ ${selectedCoin?.price} USD`: `≈ ${(selectedCoin?.price * value).toFixed(2)} USD`}</p>
    </div>
  );
};

export default CustomCoinInput;