import Input from '../../../../../components/input';
import Button from '../../../../../components/button';
import Spacer from '../../../../../components/spacer/Spacer';
import { BUTTON_TYPES } from '../../../../../components/button/data/button';


type HouseDressFieldProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    value:any;
};

const BagField: React.FC<HouseDressFieldProps> = ({ setFieldValue, value }) => {


    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('brand', e.target.value);
    };

    const handleLitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('litter', e.target.value);
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
                        label="litter"
                        placeholderText="Enter Litter"
                        onChangeText={handleLitterChange}
                        value={value.litter}
                        name='litter'
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

export default BagField;