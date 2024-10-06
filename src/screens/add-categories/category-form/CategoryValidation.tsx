import * as Yup from 'yup';

export const categorySchema = Yup.object({
    category:Yup.string().required("Please enter category "),
});