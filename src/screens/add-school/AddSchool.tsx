import './addSchool.css';
import Input from '../../components/input';
import Button from '../../components/button';
import { BUTTON_TYPES } from '../../components/button/data/button';
import { useFormik } from 'formik';
import { addSchoolSchema } from './AddSchoolValidation';
import iziToast from 'izitoast';
import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import DataTable, { TableColumn } from "react-data-table-component";

interface Row {
    schoolId:number,
    schoolName: string;
    email: string;
    number: string;
    address:string;
  }

  const columns = (handleDelete: (schoolId: number) => void): TableColumn<Row>[] => [
    {
      name: "Sr No.",
      cell: (row: Row, index: number) => (index + 1).toString(), // Use 'cell' to handle custom rendering
    },
    {
      name: "School Name",
      selector: (row: Row) => row.schoolName,
    },
    {
      name: "Email",
      selector: (row: Row) => row.email,
    },
    {
      name: "Number",
      selector: (row: Row) => row.number,
    },
    {
        name: "Dddress",
        selector: (row: Row) => row.address,
      },
    {
      name: "Action",
      cell: (row: Row) => (
        <Button 
          type={BUTTON_TYPES.SECONDARY} 
          btnText="Delete" 
          onClick={() => handleDelete(row.schoolId)} 
        />
      ),
    },
  ];
  
  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "18px",
        fontWeight: 600,
        color: "#5c5a5a",
        fontFamily: "nunito",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  
// Define the type for usersManagement
interface UsersManagement {
    userName: string;
    email: string;
    password: string;
    number: string;
    loginStatus: number;
    role: string;
}

// Define the type for schoolManagement
interface SchoolManagement {
    schoolName: string;
    email: string;
    number: string;
    address: string;
}

// Define the type for formData
interface FormData {
    usersManagement: UsersManagement;
    schoolManagement: SchoolManagement;
}


const AddSchool = () => {
    const { apipath } = useAuth();
    const [schools, setSchools] = useState<Row[]>([]);

    const { values, touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            schoolName: '',
            cityName: '',
            number: '',
            email: '',
            password: '',
            address: ''
        },
        validationSchema: addSchoolSchema,
        onSubmit: (values) => {
            const formData = {
                usersManagement: {
                    userName: values.schoolName,
                    email: values.email,
                    number: values.number,
                    role: 'school',
                    password: values.password,
                    loginStatus: 1,
                },
                schoolManagement: {
                    schoolName: values.schoolName,
                    email: values.email,
                    number: values.number,
                    address: values.address
                }
            };

            console.log("Form values:", values); // Log form values to ensure they're captured correctly
            console.log("Form data being sent:", formData); // Log the final data before sending

            _handleTeacherRegister(formData);
        },
    });

    const _handleTeacherRegister = async (formData: FormData) => {
        try {
            console.log("Sending data:", formData); // Debug the formData right before sending the request
    
            const response = await fetch(apipath + '/school-reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                iziToast.success({
                    message: "School Added Successfully",
                    position: "topCenter"
                });
            } else {
                const errorData = await response.json();
                iziToast.error({
                    message: `Error: ${errorData.message || 'Failed to save school data'}`,
                    position: "topCenter"
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                iziToast.error({
                    message: `Request failed: ${error.message}`,
                    position: "topCenter"
                });
            } else {
                iziToast.error({
                    message: 'An unknown error occurred',
                    position: "topCenter"
                });
            }
        }
    };
    

    useEffect(() => {
        fetchSchools();
      }, []);
    
      const fetchSchools = async () => {
        try {
          const response = await axios.get(`${apipath}/school/details`, {
            headers: {
              Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
            },
          });
          const filteredSchool: Row[] = response.data;
          setSchools(filteredSchool);
          console.log(filteredSchool);
        } catch (error) {
          console.error('Error fetching school:', error);
        }
      };


    const handleDelete = async (schoolId: number) => {
        try {
          const response = await fetch(`${apipath}/school/delete/${schoolId}`, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
            },
          });
    
          if (response.status === 200) {
            iziToast.success({
              message: "School Deleted Successfully",
              position: "topCenter"
            });
            fetchSchools(); // Refresh city list
          } else {
            iziToast.error({
              message: "Deletion Unsuccessful",
              position: "topCenter"
            });
          }
        } catch (error) {
          console.error('Error deleting school:', error);
          iziToast.error({
            message: "Error deleting school",
            position: "topCenter"
          });
        }
      };

      
    return (
        <>
            <h4>Add School</h4>
            <div className='row'>
                <div className='col-md-6'>
                    <Input label='School'
                        placeholderText='Enter School Name'
                        value={values.schoolName}
                        name='schoolName'
                        isRequired={true}
                        onChangeText={handleChange}
                    />
                    {errors.schoolName && touched.schoolName ? (<p className='errorForm'>{errors.schoolName}</p>) : null}
                </div>
                <div className='col-md-6'>
                    <Input label='City'
                        placeholderText='Enter City Name'
                        value={values.cityName}
                        name='cityName'
                        isRequired={true}
                        onChangeText={handleChange}
                    />
                    {errors.cityName && touched.cityName ? (<p className='errorForm'>{errors.cityName}</p>) : null}
                </div>
                <div className='col-md-6'>
                    <Input label='Phone number'
                        placeholderText='Enter phone number'
                        value={values.number}
                        name='number'
                        isRequired={true}
                        onChangeText={handleChange}
                    />
                    {errors.number && touched.number ? (<p className='errorForm'>{errors.number}</p>) : null}
                </div>
                <div className='col-md-6'>
                    <Input label='School Email'
                        placeholderText='Enter School email'
                        value={values.email}
                        name='email'
                        isRequired={true}
                        onChangeText={handleChange}
                    />
                    {errors.email && touched.email ? (<p className='errorForm'>{errors.email}</p>) : null}
                </div>
                <div className='col-md-6'>
                    <Input label='Password'
                        placeholderText='Enter password'
                        value={values.password}
                        name='password'
                        isRequired={true}
                        onChangeText={handleChange}
                    />
                    {errors.password && touched.password ? (<p className='errorForm'>{errors.password}</p>) : null}
                </div>
                <div className='col-md-6'>
                    <Input label='Address'
                        placeholderText='Enter school address'
                        value={values.address}
                        name='address'
                        isRequired={true}
                        onChangeText={handleChange}
                    />
                    {errors.address && touched.address ? (<p className='errorForm'>{errors.address}</p>) : null}
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <Button type={BUTTON_TYPES.PRIMARY} onClick={handleSubmit} btnText="Submit" />
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
            <DataTable
          columns={columns(handleDelete)}
          data={schools}
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          customStyles={customStyles}
          fixedHeader
          fixedHeaderScrollHeight="400px"
          pagination
        />
        </>
    );
}

export default AddSchool;
