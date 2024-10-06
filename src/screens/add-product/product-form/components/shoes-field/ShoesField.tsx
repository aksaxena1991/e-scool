import DropDwon, { TOption } from '../../../../../components/drop-down';
import Input from '../../../../../components/input';
import Button from '../../../../../components/button';
import Spacer from '../../../../../components/spacer/Spacer';
import { BUTTON_TYPES } from '../../../../../components/button/data/button';


type HouseDressFieldProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    value:any;
};

const ShoesField: React.FC<HouseDressFieldProps> = ({ setFieldValue, value }) => {


    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('brand', e.target.value);
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
                <Input
                        label="Brand"
                        placeholderText="Brand Name"
                        onChangeText={handleBrandChange}
                        value={value.brand}
                        name='brand'
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
                <div className="col-md-2 mt-md-3">
                    <Spacer height='5px' />
                    <Button type={BUTTON_TYPES.PRIMARY} btnText="Add" />
                </div>
            </div>
        </>
    )
};

export default ShoesField;