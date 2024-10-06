import DropDwon, { TOption } from '../../../../../components/drop-down';
import Input from '../../../../../components/input';
import Button from '../../../../../components/button';
import Spacer from '../../../../../components/spacer/Spacer';
import { BUTTON_TYPES } from '../../../../../components/button/data/button';

const colorData: TOption[] = [
    { value: "1", label: "Red" },
    { value: "2", label: "Green" },
    { value: "3", label: "Yellow" },
    { value: "4", label: "Blue" },
    { value: "5", label: "Pink" },
];

type HouseDressFieldProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    value:any;
};

const HouseDressField: React.FC<HouseDressFieldProps> = ({ setFieldValue, value }) => {


    const handleColorChange = (option: TOption) => {
        setFieldValue('color', option.label);
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('size', e.target.value);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('quantity', e.target.value);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <DropDwon
                        label='Colour'
                        options={colorData}
                        placeholderText='Select Colour'
                        onChange={handleColorChange}
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Size"
                        placeholderText="Enter Size"
                        onChangeText={handleSizeChange}
                        value={value.size}
                        name='size'
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Quantity"
                        placeholderText="Enter Quantity"
                        onChangeText={handleQuantityChange}
                        value={value.quantity}
                        name='quantity'
                    />
                </div>
                <div className="col-md-1 mt-md-3">
                    <Spacer height='5px' />
                    <Button type={BUTTON_TYPES.PRIMARY} btnText="Add" />
                </div>
            </div>
        </>
    )
};

export default HouseDressField;
