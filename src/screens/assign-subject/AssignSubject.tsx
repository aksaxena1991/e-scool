import React from 'react'
import DropDwon, { TOption } from '../../components/drop-down'
import { BUTTON_TYPES } from '../../components/button/data/button'
import Button from '../../components/button'
import { useFormik } from 'formik'
import { assignSubjectSchema } from './AssignSubjectValidation'

const opetionsData: TOption[] = [
    {
        value: "1",
        label: "Math"
    },
    {
        value: "2",
        label: "English"
    },
    {
        value: "3",
        label: "Science"
    },
    {
        value: "4",
        label: "Hindi"
    },
    {
        value: "5",
        label: "Physical Education"
    },
]

const ClassData: TOption[] = [
    {
        value: "1",
        label: "1st"
    },
    {
        value: "2",
        label: "2nd"
    },
    {
        value: "3",
        label: "3rd"
    },
    {
        value: "4",
        label: "4th"
    },
    {
        value: "5",
        label: "5th"
    },
]

const teacherData: TOption[] = [
    {
        value: "1",
        label: "Abhi Agarwal"
    },
    {
        value: "2",
        label: "Vijay Kumar"
    },
    {
        value: "3",
        label: "Salim Khan"
    },
    {
        value: "4",
        label: "Lalits Vats"
    },
    {
        value: "5",
        label: "Robin Khan"
    },
]

const AssignSubject = () => {
    const { values, touched, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            assignClass:'',
            assignTeacher:'',
            assignSubject:'',
        },
        validationSchema: assignSubjectSchema,
        onSubmit: (values, action) => {
            console.log(values, "Submit");
            action.resetForm();
        },
    });
    return (
        <>
            <h4>Assign Subject to Teacher</h4>
            <form className='m-0 p-0' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <DropDwon
                            label='Classes'
                            options={ClassData}
                            placeholderText='Select your Class'
                            value={values.assignClass}
                            onChange={(option) => setFieldValue('assignClass', option.label)}
                        />
                        {errors.assignClass && touched.assignClass ? (<p className='errorForm'>{errors.assignClass}</p>) : null}
                    </div>
                    <div className='col-md-6'>
                        <DropDwon
                            label='Teacher'
                            options={teacherData}
                            placeholderText='Select Teacher'
                            value={values.assignTeacher}
                            onChange={(option) => setFieldValue('assignTeacher', option.label)}
                        />
                        {errors.assignTeacher && touched.assignTeacher ? (<p className='errorForm'>{errors.assignTeacher}</p>) : null}
                    </div>
                    <div className='col-md-6'>
                        <DropDwon
                            label='Subject'
                            options={opetionsData}
                            placeholderText='Select Subject'
                            value={values.assignSubject}
                            onChange={(option) => setFieldValue('assignSubject', option.label)}
                        />
                        {errors.assignSubject && touched.assignSubject ? (<p className='errorForm'>{errors.assignSubject}</p>) : null}
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <Button type={BUTTON_TYPES.PRIMARY} onClick={handleSubmit} btnText="Submit" />
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </form>


        </>
    )
}

export default AssignSubject