import React, { useState } from 'react';
import Input from '../../../../../components/input';
import Button from '../../../../../components/button';
import Spacer from '../../../../../components/spacer/Spacer';
import { BUTTON_TYPES } from '../../../../../components/button/data/button';

type HouseDressFieldProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    value: any;
};

const StationeryField: React.FC<HouseDressFieldProps> = ({ setFieldValue, value }) => {

    const [brand, setBrand] = useState<string[]>([]);

    const handleStationeryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('stationeryPrice', e.target.value);
    };

    const handleStationeryBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('brand', e.target.value);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('quantity', e.target.value);
    };

    const handleAddButtonClick = () => {
        if (value.stationeryBrand && !brand.includes(value.stationeryBrand)) {
            setBrand(prevBrand => [...prevBrand, value.stationeryBrand]);
            setFieldValue('stationeryBrand', brand);
        }
    };

    console.log(brand,"Brands");
    

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <Input
                        label="Brand"
                        placeholderText="Enter Brand"
                        onChangeText={handleStationeryBrandChange}
                        // value=''
                        name='brand'
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label="Price"
                        placeholderText="Enter Price"
                        onChangeText={handleStationeryPriceChange}
                        value={value.stationeryPrice}
                        name='stationeryPrice'
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
                    <Button
                        type={BUTTON_TYPES.PRIMARY}
                        btnText="Add"
                        onClick={handleAddButtonClick}
                    />
                </div>
            </div>
        </>
    );
};

export default StationeryField;
