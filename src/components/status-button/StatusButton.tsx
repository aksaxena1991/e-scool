import React from 'react'
import './statusButton.css'

interface StatusButtonProp {
    onClick?: () => void, 
    status:boolean,
}

const StatusButton:React.FC<StatusButtonProp>= ({onClick, status}) => {
  return (
    <>
    <div className={status?"activeBtn dropdown-toggle":"inActiveBtn dropdown-toggle"} data-bs-toggle="dropdown">
      {status ? "Active" : "Inactive"}
    </div>
    <ul className="dropdown-menu dropDownMenuDiv">
    <li><p className="dropdown-item m-0">Active</p></li>
    <hr className='my-1'/>
    <li><p className="dropdown-item m-0">Inactive</p></li>
  </ul>
    </>
  )
}

export default StatusButton