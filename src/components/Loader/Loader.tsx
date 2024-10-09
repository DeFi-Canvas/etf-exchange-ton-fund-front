import './Loader.scss'
import {SpinIcon} from "@/components/Icons/Icons.tsx";

const Loader = () => {
  return (
    <div className="spinner">
      <SpinIcon className={'circle'}/>
    </div>
  );
};

export default Loader;