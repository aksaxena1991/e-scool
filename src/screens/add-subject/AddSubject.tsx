import React, { useCallback, useEffect, useState } from 'react'
import Input from '../../components/input';
import Checkbox from '../../components/check-box';
import Spacer from '../../components/spacer/Spacer';
import Button from '../../components/button';
import { BUTTON_TYPES } from '../../components/button/data/button';
import DropDwon, { TOption } from '../../components/drop-down';
import iziToast from 'izitoast';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import DataTable, { TableColumn } from "react-data-table-component";

interface Row {
  subjectId: number;
  subjectName: string;
}

const columns = (handleDelete: (id: number) => void): TableColumn<Row>[] => [
  {
    name: "Sr No.",
    cell: (row: Row, index: number) => (index + 1).toString(), // Use 'cell' to handle custom rendering
  },
  {
    name: "Subject Name",
    selector: (row: Row) => row.subjectName,
  },
  {
    name: "Action",
    cell: (row: Row) => (
      <Button 
        type={BUTTON_TYPES.SECONDARY} 
        btnText="Delete" 
        onClick={() => handleDelete(row.subjectId)} 
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
      //   backgroundColor: "#dcdeff",
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

const AddSubject = () => {

    const { apipath } = useAuth();
    const [subjects, setSubjects] = useState<Row[]>([]);
    const [grade, setGrade] = useState<string>();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const _handleGradeChange = useCallback
        ((e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            console.log('value---', value);
            setGrade(value);
        }, [grade]);

    const _handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const [formData, setFormData] = useState({
      subjectName: '',
        schoolManagement: {
            schoolId: 1
        }
    })

    const _handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(name, value);

    };

    const _handleClassRegister = async () => {
        const isFormInvalid = formData.subjectName === '';

        if (!isFormInvalid) {
            const response = await fetch(apipath + '/subject/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                iziToast.success({
                    message: "Subject Added Successfully",
                    position: "topCenter"
                });
                setFormData({
                  subjectName: '',
                    schoolManagement: {
                        schoolId: 1
                    },
                });
                // navigate("/driver-safety-security");
            } else {
                iziToast.error({
                    message: "Unsuccessful",
                    position: "topCenter"
                });
            }
        } else {
            iziToast.error({
                message: "All Fields are Required",
                position: "topCenter"
            });
        }
    };

    useEffect(() => {
        fetchSubjects();
      }, []);
    
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`${apipath}/subject/details`, {
            headers: {
              Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
            },
          });
          console.log('API response:', response.data); // Log the API response
          const filteredSubject: Row[] = response.data;
          setSubjects(filteredSubject);
          console.log('Updated subject state:', subjects); // Log the updated state
        } catch (error) {
          console.error('Error fetching subject:', error);
        }
      };
    
      const handleDelete = async (classId: number) => {
        try {
          const response = await fetch(`${apipath}/subject/delete/${classId}`, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
            },
          });
    
          if (response.status === 200) {
            iziToast.success({
              message: "Subject Deleted Successfully",
              position: "topCenter"
            });
            fetchSubjects(); // Refresh city list
          } else {
            iziToast.error({
              message: "Deletion Unsuccessful",
              position: "topCenter"
            });
          }
        } catch (error) {
          console.error('Error deleting subject:', error);
          iziToast.error({
            message: "Error deleting subject",
            position: "topCenter"
          });
        }
      };

    return (
        <>

            <h4>Add Subject</h4>
            <div className='row'>
                <div className='col-md-6'>
                    <Input
                        label='Subject'
                        placeholderText='Enter subject Name'
                        onChangeText={_handleChange}
                        value={formData.subjectName}
                        name='subjectName'
                        isRequired
                    />
                </div>
                <Spacer height='8px' />
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <Button type={BUTTON_TYPES.PRIMARY} btnText="Submit" onClick={() => {
                            _handleClassRegister();
                        }} />
                    </div>
                    <div className="col-4"></div>
                </div>
                <Spacer height="16px" />
                <DataTable
          columns={columns(handleDelete)}
          data={subjects}
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          customStyles={customStyles}
          fixedHeader
          fixedHeaderScrollHeight="400px"
          pagination
        />
            </div>

        </>
    )
}

export default AddSubject