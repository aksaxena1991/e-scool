import * as Yup from 'yup';

export const assignSubjectSchema = Yup.object({
    assignClass: Yup.string().required('Please Select option'),
    assignTeacher: Yup.string().required('Please Select option'),
    assignSubject: Yup.string().required('Please Select option'),
});