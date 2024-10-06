import Input from '../../../../../components/input';
import Button from '../../../../../components/button';
import Spacer from '../../../../../components/spacer/Spacer';
import { BUTTON_TYPES } from '../../../../../components/button/data/button';


type HouseDressFieldProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    value:any;
};

const PackageField: React.FC<HouseDressFieldProps> = ({ setFieldValue, value }) => {


    const handlePackageItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('packageItem', e.target.value);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('age', e.target.value);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('quantity', e.target.value);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                <Input
                        label="Item"
                        placeholderText="Enter Item"
                        onChangeText={handlePackageItemChange}
                        value={value.packageItem}
                        name='packageItem'
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Age"
                        placeholderText="Enter Age"
                        onChangeText={handleAgeChange}
                        value={value.age}
                        name='age'
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

export default PackageField;