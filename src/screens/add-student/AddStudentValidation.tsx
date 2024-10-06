import * as Yup from 'yup';

export const addStudentSchema = Yup.object({
    cityName:Yup.string().required("Please enter your city"),
    // schoolName:Yup.string().required("Please enter your School"),
    // schoolName:Yup.string().required("Please enter your School"),
    // schoolName:Yup.string().required("Please enter your School"),
    // schoolName:Yup.string().required("Please enter your School"),
});