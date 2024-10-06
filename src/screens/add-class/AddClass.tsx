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
  classId: number;
  className: string;
  classSection: string;
}

const columns = (handleDelete: (id: number) => void): TableColumn<Row>[] => [
  {
    name: "Sr No.",
    cell: (row: Row, index: number) => (index + 1).toString(), // Use 'cell' to handle custom rendering
  },
  {
    name: "Class Name",
    selector: (row: Row) => row.className,
  },
  {
    name: "Class Section",
    selector: (row: Row) => row.classSection,
  },
  {
    name: "Action",
    cell: (row: Row) => (
      <Button 
        type={BUTTON_TYPES.SECONDARY} 
        btnText="Delete" 
        onClick={() => handleDelete(row.classId)} 
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

const sectionData: TOption[] = [
    {
        value: "1",
        label: "A"
    },
    {
        value: "2",
        label: "B"
    },
    {
        value: "3",
        label: "C"
    },
    {
        value: "4",
        label: "D"
    },
    {
        value: "5",
        label: "E"
    },
]

const AddClass = () => {

    const { apipath } = useAuth();
    const [classes, setClasses] = useState<Row[]>([]);
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
        className: '',
        classSection: '',
        schoolManagement: {
            schoolId: 1
        }
    })

    const _handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(name, value);

    };

    const _handleDropdownChange = (option: TOption | null) => {
        setFormData({ ...formData, classSection: option ? option.label : '' });
        console.log('Selected Section:', option);
    };

    const _handleClassRegister = async () => {
        const isFormInvalid = formData.className === '' || formData.classSection === '';

        if (!isFormInvalid) {
            const response = await fetch(apipath + '/classes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                iziToast.success({
                    message: "Class Added Successfully",
                    position: "topCenter"
                });
                setFormData({
                    className: '',
                    classSection: '',
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
        fetchClasses();
      }, []);
    
      const fetchClasses = async () => {
        try {
          const response = await axios.get(`${apipath}/classes/details`, {
            headers: {
              Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
            },
          });
          console.log('API response:', response.data); // Log the API response
          const filteredClasses: Row[] = response.data;
          setClasses(filteredClasses);
          console.log('Updated classes state:', classes); // Log the updated state
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
    
      const handleDelete = async (classId: number) => {
        try {
          const response = await fetch(`${apipath}/classes/delete/${classId}`, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
            },
          });
    
          if (response.status === 200) {
            iziToast.success({
              message: "Classes Deleted Successfully",
              position: "topCenter"
            });
            fetchClasses(); // Refresh city list
          } else {
            iziToast.error({
              message: "Deletion Unsuccessful",
              position: "topCenter"
            });
          }
        } catch (error) {
          console.error('Error deleting classes:', error);
          iziToast.error({
            message: "Error deleting classes",
            position: "topCenter"
          });
        }
      };

    return (
        <>

            <h4>Add Class</h4>
            <div className='row'>
                <div className='col-md-6'>
                    <Input
                        label='Class'
                        placeholderText='Enter Class Name'
                        onChangeText={_handleChange}
                        value={formData.className}
                        name='className'
                        isRequired
                    />
                </div>
                <div className='col-md-6'>
                    <DropDwon
                        label='Section'
                        options={sectionData}
                        placeholderText='Select Section'
                        onChange={_handleDropdownChange}
                        value={formData.classSection}

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
          data={classes}
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

export default AddClass