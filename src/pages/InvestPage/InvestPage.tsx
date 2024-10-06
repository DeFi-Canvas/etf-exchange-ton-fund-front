import {useParams} from "react-router-dom";

const InvestPage = () => {
  const {id} = useParams()

  if (!id) return <>404</>

  return (
    <div>
      {id}
    </div>
  );
};

export default InvestPage;