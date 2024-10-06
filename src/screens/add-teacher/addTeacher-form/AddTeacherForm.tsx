import "./addTeacherForm.css";
import React, { useEffect, useState } from "react";
import { addTeacherSchema } from "./AddTeacherSchema";
import { useFormik } from "formik";
import Input from "../../../components/input";
import Datepicker from "../../../components/date-picker";
import Spacer from "../../../components/spacer/Spacer";
import RadioButton from "../../../components/radio";
import Button from "../../../components/button";
import DropDwon, { TOption } from '../../../components/drop-down';
import { BUTTON_TYPES } from "../../../components/button/data/button";
import './addTeacherForm.css';
import iziToast from "izitoast";
import { useAuth } from "../../../AuthContext";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";



    
type AddTeacherFormProps = {
    onclose: () => void;
};

const AddTeacherFrom: React.FC<AddTeacherFormProps> = ({ onclose }) => {

    const { apipath } = useAuth();
    // const [teachers, setTeachers] = useState<Row[]>([]);
    
    const [formData, setFormData] = useState({
        teacherName: "",
        email: "",
        teacherQualification: "",
        teacherDOB: "",
        gender: "",
        teacherFather: "",
        password: "",
        state: "",
        city: "",
        pincode: '',
        number: "",
        address: "",
        schoolManagement: {
            schoolId: 1
        }
    })

    const _handleChange = (e:any)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const _handleRadioChange = (value: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            gender: value
        }));
    };

    const _handleTeacherRegister = async () => {
        
        const isFormInvalid = formData.teacherName === '' || formData.email === '' || formData.teacherQualification === '' || formData.gender === '' || formData.teacherFather === '' || formData.password === '' || formData.state === '' || formData.city === '' || formData.pincode === '' || formData.number === '' || formData.address==='';

        if (!isFormInvalid) {
            const response = await fetch(apipath + '/teacher/reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                iziToast.success({
                    message: "Teacher Added Successfully",
                    position: "topCenter"
                });
                // navigate("/driver-safety-security");
            } else {
                iziToast.error({
                    message: "Unsuccessful",
                    position: "topCenter"
                });
            }
        } else {
            iziToast.error({
                message: "All Fields are Required",
                position: "topCenter"
            });
        }
    }


    
    

    return (
        <div>
            <h2 className="text-center">Add Teacher</h2>
            <div className="row bg-white mx-5 py-4 px-5 rounded-2 position-relative">
                <p onClick={onclose}>
                    <i className="closeBtn bi bi-x-circle"></i>
                </p>
                <div className="row">
                    <div className="col-md-6">
                        <Input label="Teacher"
                            placeholderText="Enter Teacher Name"
                            value={formData.teacherName}
                            name='teacherName'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input label="Father"
                            placeholderText="Enter Father Name"
                            value={formData.teacherFather}
                            name='teacherFather'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Datepicker label="Date of Birth" />
                    </div>
                    <div className="col-md-6">
                        <Input label="Educational Qualification"
                            placeholderText="Enter Qualification "
                            value={formData.teacherQualification}
                            name='teacherQualification'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>

                    <div className="col-md-12">
                        <Spacer height="12px" />
                        <div className="d-flex">
                            <span>Gender</span>
                            <RadioButton
                                label="Male"
                                name="teacherGender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={() => _handleRadioChange('Male')}
                            />
                            <RadioButton
                                label="Female"
                                name="teacherGender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={() => _handleRadioChange('Female')}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Input label="Contect No."
                            placeholderText="Enter Number "
                            value={formData.number}
                            name='number'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input label="Email"
                            placeholderText="Enter Email "
                            value={formData.email}
                            name='email'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input label="Password"
                            placeholderText="Enter Password "
                            value={formData.password}
                            name='password'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input label="State"
                            placeholderText="Enter State "
                            value={formData.state}
                            name='state'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input label="City"
                            placeholderText="Enter City "
                            value={formData.city}
                            name='city'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input label="Pincode"
                            placeholderText="Enter Pincode "
                            value={formData.pincode}
                            name='pincode'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <Input label="Address"
                            placeholderText="Enter Address "
                            value={formData.address}
                            name='address'
                            isRequired={true}
                            onChangeText={_handleChange}
                        />
                    </div>
                    <Spacer height="8px" />
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <Button type={BUTTON_TYPES.PRIMARY} onClick={() => {
                                _handleTeacherRegister();
                            }} btnText="Submit" />
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddTeacherFrom;
