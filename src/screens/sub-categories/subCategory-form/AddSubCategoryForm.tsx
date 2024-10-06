import React, { useCallback, useState } from "react";
import "./addSubCategoryForm.css";
import DropDwon, { TOption } from "../../../components/drop-down";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { BUTTON_TYPES } from "../../../components/button/data/button";
import { useFormik } from "formik";
import { subCategorySchema } from "./SubCategoryValidation";
import Spacer from "../../../components/spacer/Spacer";

type AddSubCategoryFormProps = {
    onclose: () => void;
};

const AddSubCategoryFrom: React.FC<AddSubCategoryFormProps> = ({ onclose }) => {

    const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            category: '',
            subCategory: '',
        },
        validationSchema: subCategorySchema,
        onSubmit: (values, action) => {
            action.resetForm();
        },
    });

    const CategoryOptions: TOption[] = [
        {
            value: "1",
            label: "Uniform",
        },
        {
            value: "2",
            label: "Shoes",
        },
        {
            value: "3",
            label: "Books",
        },
        {
            value: "4",
            label: "Stationery",
        },
        {
            value: "5",
            label: "Bags",
        },
    ];

    return (
        <div>
            <h2 className="text-center">Add Sub Category</h2>
            <div className="row bg-white mx-5 py-4 px-5 rounded-2 position-relative">
                <p onClick={onclose}>
                    <i className="closeBtn bi bi-x-circle"></i>
                </p>
                <form className="p-0 m-0" onSubmit={handleSubmit}>
                    <div className="row">
                    <div className="col-md-6">
                    <DropDwon
                        label="Select Category"
                        options={CategoryOptions}
                        placeholderText="Select your Category"
                        value={values.category}
                        onChange={(option) => setFieldValue('category', option.label)}
                    />
                    {errors.category && touched.category ? (<p className='errorForm'>{errors.category}</p>) : null}
                    </div>
                    <div className="col-md-6">
                    <Input
                        label="Sub Category"
                        placeholderText="Ener Sub Category"
                        value={values.subCategory}
                        name='subCategory'
                        isRequired={true}
                        onChangeText={handleChange}

                    />
                    {errors.subCategory && touched.subCategory ? (<p className='errorForm'>{errors.subCategory}</p>) : null}
                    </div>
                    </div>
                    <Spacer height='8px' />
                    <div>
                        <Button type={BUTTON_TYPES.PRIMARY} onClick={handleSubmit} btnText="Add Sub Category" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubCategoryFrom;
