import './addSchool.css';
import Input from '../../components/input';
import Button from '../../components/button';
import { BUTTON_TYPES } from '../../components/button/data/button';
import { useFormik } from 'formik';
import { addStudentSchema } from './AddStudentValidation';
import iziToast from 'izitoast';
import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import DataTable, { TableColumn } from "react-data-table-component";

interface Row {
  studentId: number;
  studentName: string;
  email: string;
  number: string;
  address: string;
}

const columns = (handleDelete: (studentId: number) => void): TableColumn<Row>[] => [
  {
    name: "Sr No.",
    cell: (row: Row, index: number) => (index + 1).toString(), // Use 'cell' to handle custom rendering
  },
  {
    name: "Student Name",
    selector: (row: Row) => row.studentName,
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
    name: "Address",
    selector: (row: Row) => row.address,
  },
  {
    name: "Action",
    cell: (row: Row) => (
      <Button 
        type={BUTTON_TYPES.SECONDARY} 
        btnText="Delete" 
        onClick={() => handleDelete(row.studentId)} 
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

// Define the type for formData
interface FormData {
  usersManagement: {
    userName: string;
    email: string;
    password: string;
    number: string;
    loginStatus: number;
    role: string;
  };
  studentManagement: {
    studentName: string;
    email: string;
    number: string;
    address: string;
    schoolManagement: {
      schoolId: number;
    };
  };
}

const AddSchool = () => {
  const { apipath } = useAuth();
  const [students, setStudents] = useState<Row[]>([]);

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: '',
      number: '',
      email: '',
      password: '',
      address: '',
      studentName: '',  // Ensure initial values match your form fields
    },
    validationSchema: addStudentSchema,
    onSubmit: (values) => {
      const formData: FormData = {
        usersManagement: {
          userName: values.userName,
          email: values.email,
          number: values.number,
          role: 'student',
          password: values.password,
          loginStatus: 3,
        },
        studentManagement: {
          studentName: values.studentName,
          email: values.email,
          number: values.number,
          address: values.address,
          schoolManagement: {
            schoolId: 1,  // Example static value, replace with actual value if dynamic
          },
        },
      };

      console.log("Form values:", values);
      console.log("Form data being sent:", formData);

      _handleTeacherRegister(formData);
    },
  });

  const _handleTeacherRegister = async (formData: FormData) => {
    try {
      console.log("Sending data:", formData);

      const response = await fetch(apipath + '/student-reg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE' // Replace with your actual token
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        iziToast.success({
          message: "Student Added Successfully",
          position: "topCenter"
        });
        fetchSchools(); // Refresh the student list
      } else {
        const errorData = await response.json();
        iziToast.error({
          message: `Error: ${errorData.message || 'Failed to save student data'}`,
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
      const response = await axios.get(`${apipath}/student/details`, {
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE' // Replace with your actual token
        },
      });
      const filteredStudent: Row[] = response.data;
      setStudents(filteredStudent);
      console.log(filteredStudent);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (studentId: number) => {
    try {
      const response = await fetch(`${apipath}/student/delete/${studentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE' // Replace with your actual token
        },
      });

      if (response.ok) {
        iziToast.success({
          message: "Student Deleted Successfully",
          position: "topCenter"
        });
        fetchSchools(); // Refresh student list
      } else {
        iziToast.error({
          message: "Deletion Unsuccessful",
          position: "topCenter"
        });
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      iziToast.error({
        message: "Error deleting student",
        position: "topCenter"
      });
    }
  };

  return (
    <>
      <h4>Add Student</h4>
      <div className='row'>
        <div className='col-md-6'>
          <Input label='Student Name'
            placeholderText='Enter Student Name'
            value={values.studentName}
            name='studentName'
            isRequired={true}
            onChangeText={handleChange}
          />
          {errors.studentName && touched.studentName ? (<p className='errorForm'>{errors.studentName}</p>) : null}
        </div>
        <div className='col-md-6'>
          <Input label='Phone Number'
            placeholderText='Enter Phone Number'
            value={values.number}
            name='number'
            isRequired={true}
            onChangeText={handleChange}
          />
          {errors.number && touched.number ? (<p className='errorForm'>{errors.number}</p>) : null}
        </div>
        <div className='col-md-6'>
          <Input label='Email'
            placeholderText='Enter Email'
            value={values.email}
            name='email'
            isRequired={true}
            onChangeText={handleChange}
          />
          {errors.email && touched.email ? (<p className='errorForm'>{errors.email}</p>) : null}
        </div>
        <div className='col-md-6'>
          <Input label='Password'
            placeholderText='Enter Password'
            value={values.password}
            name='password'
            isRequired={true}
            onChangeText={handleChange}
          />
          {errors.password && touched.password ? (<p className='errorForm'>{errors.password}</p>) : null}
        </div>
        <div className='col-md-6'>
          <Input label='Address'
            placeholderText='Enter Address'
            value={values.address}
            name='address'
            isRequired={true}
            onChangeText={handleChange}
          />
          {errors.address && touched.address ? (<p className='errorForm'>{errors.address}</p>) : null}
        </div>
        <div className='col-md-12'>
          <Button 
            type={BUTTON_TYPES.PRIMARY} 
            btnText='Submit' 
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className='row mt-4'>
        <DataTable
          columns={columns(handleDelete)}
          data={students}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default AddSchool;
