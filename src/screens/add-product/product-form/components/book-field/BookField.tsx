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

const BookField: React.FC<HouseDressFieldProps> = ({ setFieldValue, value }) => {


    const handlebookClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('bookClass', e.target.value);
    };

    const handlebookAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('bookAuthor', e.target.value);
    };

    const handlebookQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('bookQuantity', e.target.value);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                <Input
                        label="Class"
                        placeholderText="Book Class"
                        onChangeText={handlebookClassChange}
                        value={value.bookClass}
                        name='bookClass'
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Author"
                        placeholderText="Enter Book Author"
                        onChangeText={handlebookAuthorChange}
                        value={value.bookAuthor}
                        name='bookAuthor'
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Quantity"
                        placeholderText="Enter Quantity"
                        onChangeText={handlebookQuantityChange}
                        value={value.bookQuantity}
                        name='bookQuantity'
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

export default BookField;