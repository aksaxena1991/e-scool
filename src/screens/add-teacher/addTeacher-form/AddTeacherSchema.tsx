import * as Yup from 'yup';

export const addTeacherSchema = Yup.object({
    teacherName:Yup.string().min(2, 'Too Short!').required("Please enter teacher name"),
    teacherFather:Yup.string().required("Please enter father name"),
    teacherQualification:Yup.string().required("Please enter Qualification"),
    teacherNumber:Yup.string().min(10, 'Enter valid number').max(10, 'Enter valid number').required("Please enter Phone number"),
    teacherEmail:Yup.string().email('Invalid email').required("Please enter email"),
    teacherPassword:Yup.string().min(6, 'Minimun 6 Character required').required("Please enter password"),
    teacherState:Yup.string().required("State is required"),
    teacherCity:Yup.string().required("City is required"),
    teacherPincode:Yup.string().required("Pincode is required"),
    teacherAddress:Yup.string().required("Address is required"),
    teacherGender:Yup.string().required("Gender is required"),
});