import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import 'bootstrap/dist/css/bootstrap.main.css'

interface IDatepickerProps {
  label:string;
  isRequired?:boolean;
}

const Datepicker: React.FC<IDatepickerProps> = ({label,isRequired}) => {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  return (
    <>
      <div>
      <p  className='label'>{label}{isRequired ? <span className='required'>*</span> : null}</p>
      <input  className='input' type='date'/>
      </div>
    </>
  )
}

export default Datepicker