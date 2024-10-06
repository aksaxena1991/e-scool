import React, { useCallback, useState } from 'react'
import Input from '../../../../../components/input';
import Spacer from '../../../../../components/spacer/Spacer';
import Button from '../../../../../components/button';
import { BUTTON_TYPES } from '../../../../../components/button/data/button';

const DressInput = () => {

    const [addProduct, setAddProduct] = useState<string>("");

    const _handleProductChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            console.log(value, "Product Value");
            setAddProduct(value);
        },
        [addProduct]
    );

  return (
    <>
    <div className="row">
    <div className="col-md-3">
                    <Input
                        label="Size"
                        placeholderText="Enter Size "
                        onChangeText={_handleProductChange}
                        value=""
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Quantity"
                        placeholderText="Enter Quantity "
                        onChangeText={_handleProductChange}
                        value=""
                    />
                </div>
                <div className="col-md-1 mt-md-3">
                    <Spacer height='5px' />
                    <Button type={BUTTON_TYPES.PRIMARY} btnText="Add" />
                </div>
    </div>
    </>
  )
}

export default DressInput;