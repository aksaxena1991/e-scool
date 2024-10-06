import * as Yup from 'yup';

export const addSchoolSchema = Yup.object({
    cityName:Yup.string().required("Please enter your city"),
    schoolName:Yup.string().required("Please enter your School"),
    number:Yup.string().required("Please enter your number"),
    email:Yup.string().required("Please enter your email"),
    password:Yup.string().required("Please enter your password"),
    address:Yup.string().required("Please enter your address"),
});