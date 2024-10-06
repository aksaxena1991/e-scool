import React from 'react'
import './checkBox.css'

interface ICheckboxProps {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void,
    height?: string,
    width?: string
    id?:string
}

const Checkbox: React.FC<ICheckboxProps> = ({ label, checked, onChange,height,width,id }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked)
    }

    return (
        <div className=' form-check mainDiv '>
            <input  style={{height:height, width:width}} type="checkbox" id={id} onChange={handleChange} checked={checked} />
            <span className="form-check-label  labelStyle" >{label}</span>
        </div>
    )
}

export default Checkbox