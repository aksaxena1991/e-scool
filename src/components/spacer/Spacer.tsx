import React from 'react'

interface ISpacerProps {
    width?: string,
    height?: string,
}


const Spacer: React.FC<ISpacerProps> = ({ width, height }) => {
    return (
        <div  style={{height: height, width: width}}>
        </div>
    )
}

export default Spacer;