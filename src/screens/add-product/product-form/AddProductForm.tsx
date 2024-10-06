import Spacer from "../../../components/spacer/Spacer";
import RadioButton from "../../../components/radio";
import DropDwon, { TOption } from "../../../components/drop-down";
import { BUTTON_TYPES } from "../../../components/button/data/button";
import Button from "../../../components/button";
import './addProductForm.css';
import { useFormik } from "formik";
import DressInput from "./components/dress-input/DressInput";
import HouseDressField from "./components/houseDress-field/HouseDressField";
import BookField from "./components/book-field/BookField";
import StationeryField from "./components/stationery-field/StationeryField";
import ShoesField from "./components/shoes-field/ShoesField";
import BagField from "./components/bag-field/BagField";
import PackageField from "./components/package-field/PackageField";

type AddProductFormProps = {
    onclose?: () => void;
}
const SchoolData: TOption[] = [
    {
        value: "1",
        label: "Aarsha Public Scool"
    },
    {
        value: "2",
        label: "Gyan Deep sr. Secondary School"
    },
    {
        value: "3",
        label: "Scholar Pride Public School"
    },
    {
        value: "4",
        label: "A.One Public School"
    },
    {
        value: "5",
        label: "Dronacharya Public Scool"
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
    {
        value: "6",
        label: "6th"
    },
    {
        value: "7",
        label: "7th"
    },
    {
        value: "8",
        label: "8th"
    },
    {
        value: "9",
        label: "9th"
    },
]
const subCategoryData: TOption[] = [
    {
        value: "1",
        label: "Shirt"
    },
    {
        value: "2",
        label: "Pant"
    },
    {
        value: "3",
        label: "House Dress"
    },
    {
        value: "4",
        label: "Skirt"
    },
    {
        value: "5",
        label: "Package"
    },
    {
        value: "6",
        label: "Coat"
    },
    {
        value: "7",
        label: "Blet"
    },
    {
        value: "8",
        label: "Pant"
    },
    {
        value: "9",
        label: "9th"
    },
    {
        value: "9",
        label: "9th"
    },
]
const categoryOptions: TOption[] = [
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
const booksOptions: TOption[] = [
    {
        value: "1",
        label: "Hindi",
    },
    {
        value: "2",
        label: "English",
    },
    {
        value: "3",
        label: "Math",
    },
    {
        value: "4",
        label: "Science",
    },
    {
        value: "5",
        label: "Physical Education",
    },
];
const shoesOptions: TOption[] = [
    {
        value: "1",
        label: "Sport Shoes",
    },
    {
        value: "2",
        label: "PT Shoes",
    },
];
const BagsOptions: TOption[] = [
    {
        value: "1",
        label: "Styling Bag",
    },
    {
        value: "2",
        label: "School Bag",
    },
    {
        value: "3",
        label: "Travelling Bag",
    },
];
const stationeryOptions: TOption[] = [
    {
        value: "1",
        label: "Ball Pen",
    },
    {
        value: "2",
        label: "Colors",
    },
    {
        value: "3",
        label: "Pencil",
    },
    {
        value: "4",
        label: "Eraser",
    },
    {
        value: "5",
        label: "Gel Pen",
    },
];


const AddProductForm: React.FC<AddProductFormProps> = ({ onclose }) => {

    const { touched, errors, values, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            school: '',
            class: '',
            category: '',
            subCategory: '',
            color: '',
            size: '',
            brand: '',
            quantity: '',
            bookQuantity: '',
            bookAuthor: '',
            bookClass: '',
            stationeryBrand: '',
            stationeryPrice: '',
            litter: '',
            age:'',
            packageItem:'',
        },
        onSubmit: (values, action) => {
            console.log(values, "Values");

        },

    });

    const check = values;


    const subCategoryChecker = () => {
        switch (values.category) {
            case "Books":
                return booksOptions;
            case "Uniform":
                return subCategoryData;
            case "Stationery":
                return stationeryOptions;
            case "Shoes":
                return shoesOptions;
            case "Bags":
                return BagsOptions;
            default:
                return [];
        }
    }

    const bagCategoryCheck = values.category === "Bags";
    const packageCheck = values.subCategory === "Package";
    const bookCategoryCheck = values.category === "Books";
    const shoesCategoryCheck = values.category === "Shoes";
    const stationeryCategoryCheck = values.category === "Stationery";
    const houseDressCheck = values.subCategory === "House Dress" && values.category === "Uniform";
    const dressCheck = values.category === "Uniform" && values.subCategory !== "House Dress" && values.subCategory !== "Package";

    return (
        <div>
            <h2 className="text-center">Add Product</h2>
            <div className="row bg-white mx-5 py-4 px-5 rounded-2 position-relative">
                <p onClick={onclose}><i className="closeBtn bi bi-x-circle"></i></p>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <DropDwon
                                label='School'
                                options={SchoolData}
                                placeholderText='Select School'
                                value={values.school}
                                onChange={(option) => setFieldValue('school', option.label)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <DropDwon
                                label='Class'
                                options={ClassData}
                                placeholderText='Select Class'
                                value={values.class}
                                onChange={(option) => setFieldValue('class', option.label)}
                            />

                        </div>
                        <div className='col-md-6'>
                            <DropDwon
                                label='Category'
                                options={categoryOptions}
                                placeholderText='Select Category'
                                value={values.category}
                                onChange={(option) => setFieldValue('category', option.label)}
                            />

                        </div>
                        <div className='col-md-6'>
                            <DropDwon
                                label='Sub Category'
                                options={subCategoryChecker()}
                                placeholderText='Select Sub Category'
                                value={values.subCategory}
                                onChange={(option) => setFieldValue('subCategory', option.label)}
                            />

                        </div>
                        {houseDressCheck ?
                            <>
                                <div className="col-md-12">
                                    <Spacer height="12px" />
                                    <div className="d-flex">
                                        <span>Gender</span>
                                        <RadioButton label="Boy" name="student" value="" />
                                        <RadioButton label="Girl" name="student" value="" />
                                    </div>
                                </div>
                                <HouseDressField setFieldValue={setFieldValue} value={values} />
                            </>
                            : null
                        }
                        {shoesCategoryCheck ?
                            <>
                                <div className="col-md-12">
                                    <Spacer height="12px" />
                                    <div className="d-flex">
                                        <span>Gender</span>
                                        <RadioButton label="Boy" name="student" value="" />
                                        <RadioButton label="Girl" name="student" value="" />
                                    </div>
                                </div>
                                <ShoesField setFieldValue={setFieldValue} value={values} />
                            </>
                            : null
                        }
                        {dressCheck ? <>
                            <div className="col-md-12">
                                <Spacer height="12px" />
                                <div className="d-flex">
                                    <span>Gender</span>
                                    <RadioButton label="Boy" name="student" value="" />
                                    <RadioButton label="Girl" name="student" value="" />
                                </div>
                            </div><DressInput /></> : null}
                        {packageCheck ? <>
                            <div className="col-md-12">
                                <Spacer height="12px" />
                                <div className="d-flex">
                                    <span>Gender</span>
                                    <RadioButton label="Boy" name="student" value="" />
                                    <RadioButton label="Girl" name="student" value="" />
                                </div>
                            </div>
                            <PackageField setFieldValue={setFieldValue} value={values} />
                            </> 
                            : null}

                        {bagCategoryCheck && <BagField setFieldValue={setFieldValue} value={values} />}
                        {bookCategoryCheck && <BookField setFieldValue={setFieldValue} value={values} />}
                        {stationeryCategoryCheck && <StationeryField setFieldValue={setFieldValue} value={values} />}
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <Button type={BUTTON_TYPES.PRIMARY} onClick={handleSubmit} btnText="Add Product" />
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default AddProductForm;