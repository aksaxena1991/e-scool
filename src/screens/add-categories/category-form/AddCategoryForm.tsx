import React, { useCallback, useState } from "react";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { BUTTON_TYPES } from "../../../components/button/data/button";
import './addCategoryForm.css';
import Spacer from "../../../components/spacer/Spacer";
import { useFormik } from "formik";
import { categorySchema } from "./CategoryValidation";

type AddCategoryFormProps = {
    onclose: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onclose }) => {

   const {handleChange, handleSubmit, values, touched, errors } = useFormik({
        initialValues:{
            category:'',
        },
        validationSchema:categorySchema,
        onSubmit: (values,action) => {
            console.log(values,"Submitted");
            action.resetForm();
        },
    })

    return <div>
        <h2 className="text-center">Add Category</h2>
        <div className="row bg-white mx-5 py-4 px-5 rounded-2 position-relative">
            <p onClick={onclose}><i className="closeBtn bi bi-x-circle"></i></p>
            <form className="p-0 m-0" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                <Input label="Category"
                placeholderText="Ener Category"
                value={values.category}
                        name='category'
                        isRequired={true}
                        onChangeText={handleChange}
            />
            {errors.category && touched.category ? (<p className='errorForm'>{errors.category}</p>) : null}
                </div>
            </div>
            <Spacer height='8px' />
            <div><Button type={BUTTON_TYPES.PRIMARY} onClick={handleSubmit} btnText="Add Category" /></div>
            </form>
        </div>
    </div>
};

export default AddCategoryForm;