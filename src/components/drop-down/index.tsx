import React from "react";
import "./dropDown.css";
import Select from "react-select";

export type TOption = {
  value: string;
  label: string;
};

interface IDropDownProps {
  label?: string;
  placeholderText?: string;
  options: TOption[];
  value?: any;
  onChange?: (option: any) => void;
}

const DropDwon: React.FC<IDropDownProps> = ({
  label,
  placeholderText,
  options,
  value,
  onChange,
}) => {
  return (
    <div>
      <p className="label">{label} </p>
      <Select
        options={options}
        placeholder={placeholderText}
        value={options.find((option) => option.label === label)}
        onChange={onChange}
      />
    </div>
  );
};

export default DropDwon;
