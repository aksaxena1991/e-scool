import React from 'react';
import './input.css';

interface IInputProps {
    label: string;
    placeholderText: string;
    onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputStyle?: any;
    style?: any;
    isRequired?: boolean;
    value?: string;
    name?:string;
}

const Input: React.FC<IInputProps> = ({label,value, isRequired = false, placeholderText, onChangeText, name}) => {
    
    return (
         
        <div >
            <p  className='label'>{label}{isRequired ? <span className='required'> *</span> : null}</p>
            <input className='input' placeholder={placeholderText} value={value} name={name} onChange={onChangeText} />
        </div>
    )
}

export default Input


