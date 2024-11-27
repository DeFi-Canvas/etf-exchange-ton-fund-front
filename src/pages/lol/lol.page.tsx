import { useState } from 'react';

const LolPage = () => {
    const [val, setVal] = useState('0');
    const changeInp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal(event.currentTarget.value);
    }

    return (
        <>
            <input 
                type="text"
                value={val}
                onChange={changeInp}
            />
        </>
    )
}

export default LolPage;
