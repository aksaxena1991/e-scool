import './addTeacher.css';
import Button from "../../components/button";
import { BUTTON_TYPES } from "../../components/button/data/button";
import Modal from '../../components/modal';
import AddTeacherFrom from './addTeacher-form/AddTeacherForm';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import iziToast from 'izitoast';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const AddTeacher: React.FC = () => {
    const { apipath } = useAuth();
    const [teachers, setTeachers] = useState<Row[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    interface Row {
        teacherId: number;
        teacherName: string;
        email: string;
        number: string;
        class: string;
        subject: string;
      }
      
      const columns = (handleDelete: (teacherId: number) => void): TableColumn<Row>[] => [
        {
          name: "Sr No.",
          cell: (row: Row, index: number) => (index + 1).toString(),
        },
        {
          name: "Teacher Name",
          selector: (row: Row) => row.teacherName,
        },
        {
          name: "Email Section",
          selector: (row: Row) => row.email,
        },
        {
          name: "Number Section",
          selector: (row: Row) => row.number,
        },
        {
          name: "Class Section",
          selector: (row: Row) => row.class,
        },
        {
          name: "Subject Section",
          selector: (row: Row) => row.subject,
        },
        {
          name: "Action",
          cell: (row: Row) => (
            <Button 
              type={BUTTON_TYPES.SECONDARY} 
              btnText="Delete" 
              onClick={() => {
                console.log('Deleting teacher with ID:', row.teacherId); // Debug log
                handleDelete(row.teacherId);
              }} 
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

        useEffect(() => {
            fetchTeachers();
          }, []);
        
          const fetchTeachers = async () => {
            try {
              const response = await axios.get(`${apipath}/teacher/details`, {
                headers: {
                  Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
                },
              });
              console.log('API response:', response.data); // Log the API response
              const filteredTeachers: Row[] = response.data;
              setTeachers(filteredTeachers);
              console.log('Updated filteredTeachers:', teachers); // Log the updated state
            } catch (error) {
              console.error('Error fetching teacher:', error);
            }
          };
    
          const handleDelete = async (teacherId: number) => {
            console.log('Teacher ID to delete:', teacherId); // Debug log
            if (teacherId === undefined || teacherId === null) {
                iziToast.error({
                    message: "Invalid Teacher ID",
                    position: "topCenter"
                });
                return;
            }
        
            try {
                const response = await fetch(`${apipath}/teacher/delete/${teacherId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
                    },
                });
        
                if (response.status === 200) {
                    iziToast.success({
                        message: "Teacher Deleted Successfully",
                        position: "topCenter"
                    });
                    fetchTeachers(); // Refresh the teacher list
                } else {
                    iziToast.error({
                        message: "Deletion Unsuccessful",
                        position: "topCenter"
                    });
                }
            } catch (error) {
                console.error('Error deleting teacher:', error);
                iziToast.error({
                    message: "Error deleting teacher",
                    position: "topCenter"
                });
            }
        };

    return (
        <>

            <div className="row d-flex align-items-center justify-content-around">
                <div className="col-6">
                    <h4>Teachers</h4>
                </div>
                <div className="col-6 d-flex justify-content-around">
                    <Button
                        onClick={() => setShowModal(true)}
                        type={BUTTON_TYPES.PRIMARY}
                        btnText="Add Teacher"
                    />
                </div>
            </div>

            <Modal isOpen={showModal}>
                <AddTeacherFrom onclose={()=>{
                    setShowModal(false);
                }}/>
            </Modal>
            <DataTable
          columns={columns(handleDelete)}
          data={teachers}
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

export default AddTeacher;
