import React, { PropsWithChildren, useCallback, useState } from "react";
import "./modal.css";

type MOdalProps = PropsWithChildren & {
    isOpen: boolean;
}

const Index:React.FC<MOdalProps> = ({children, isOpen}) => {
    


    if(!isOpen) return null;


    return (
        <>
            <div className="fixed-bg-blur">
                {children}
            </div>
        </>
    );
};

export default Index;
