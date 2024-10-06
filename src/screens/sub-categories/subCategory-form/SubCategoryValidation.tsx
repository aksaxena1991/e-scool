import * as Yup from 'yup';

export const subCategorySchema = Yup.object({
    category: Yup.string().required('Please Select option'),
    subCategory:Yup.string().required("Please enter sub category "),
});