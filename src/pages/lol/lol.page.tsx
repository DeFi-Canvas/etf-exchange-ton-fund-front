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

            <div style={{ width: '100px', height: '1000px', border: '1px solid red',}}></div>
        </>
    )
}

export default LolPage;
