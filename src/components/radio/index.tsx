import React from 'react'
import './radio.css'



interface IRadioProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    onChange?: () => void;
}


const RadioButton: React.FC<IRadioProps> = ({ label, name,value, checked, onChange }) => {
    return (
        <div className='form-check maindiv' >
            <input type='radio' name={name} checked={checked}
                onChange={onChange} value={value}/>
            <span style={{marginLeft:"6px"}}>{label}</span>
        </div>
    )
}

export default RadioButton