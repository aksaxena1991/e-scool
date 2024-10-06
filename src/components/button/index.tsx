import React from 'react'
import './button.css'
import { BUTTON_TYPES } from './data/button';

interface IButtonProp {
    type: string,
    btnText: string,
    onClick?: () => void, 
}

const Button:React.FC<IButtonProp> = (props: any) => {
    const { type,btnText, onClick, } = props;

    const getButtonClass = () => {
        switch (type) {
            case BUTTON_TYPES.PRIMARY:
                return 'primarybtn button'
            case BUTTON_TYPES.SECONDARY:
                return 'secondarybtn button';
            default:
                return 'tertiarybtn button'
        }
    }

    return (
        <div className={`${getButtonClass()}`} onClick={onClick}>{btnText}</div>
    )
}

export default Button