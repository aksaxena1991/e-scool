import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { BUTTON_TYPES } from "../../components/button/data/button";
import Spacer from "../../components/spacer/Spacer";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAuth } from "../../AuthContext";
import iziToast from "izitoast";
import axios from "axios";

interface Row {
  citystateId: number;
  cityName: string;
  stateName: string;
  countryName: string;
}

const columns = (handleDelete: (id: number) => void): TableColumn<Row>[] => [
  {
    name: "Sr No.",
    cell: (row: Row, index: number) => (index + 1).toString(), // Use 'cell' to handle custom rendering
  },
  {
    name: "City",
    selector: (row: Row) => row.cityName,
  },
  {
    name: "State",
    selector: (row: Row) => row.stateName,
  },
  {
    name: "Country",
    selector: (row: Row) => row.countryName,
  },
  {
    name: "Action",
    cell: (row: Row) => (
      <Button 
        type={BUTTON_TYPES.SECONDARY} 
        btnText="Delete" 
        onClick={() => handleDelete(row.citystateId)} 
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

const AddCity = () => {
  const { apipath } = useAuth();

  const [city, setCity] = useState<Row[]>([]);
  const [formData, setFormData] = useState({
    cityName: '',
    stateName: '',
    countryName: ''
  });

  const _handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    fetchCity();
  }, []);

  const fetchCity = async () => {
    try {
      const response = await axios.get(`${apipath}/city-state/details`, {
        headers: {
          Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
        },
      });
      const filteredCity: Row[] = response.data;
      setCity(filteredCity);
      console.log(filteredCity);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const _handleCityRegister = async () => {
    const isFormInvalid = formData.cityName === '' || formData.stateName === '' || formData.countryName === '';
  
    if (!isFormInvalid) {
      const response = await fetch(apipath + '/city-state/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 200) {
        iziToast.success({
          message: "City Added Successfully",
          position: "topCenter"
        });
        setFormData({
          cityName: '',
          stateName: '',
          countryName: ''
        });
        fetchCity(); // Refresh city list
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

  const handleDelete = async (citystateId: number) => {
    try {
      const response = await fetch(`${apipath}/city-state/delete/${citystateId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
        },
      });

      if (response.status === 200) {
        iziToast.success({
          message: "City Deleted Successfully",
          position: "topCenter"
        });
        fetchCity(); // Refresh city list
      } else {
        iziToast.error({
          message: "Deletion Unsuccessful",
          position: "topCenter"
        });
      }
    } catch (error) {
      console.error('Error deleting city:', error);
      iziToast.error({
        message: "Error deleting city",
        position: "topCenter"
      });
    }
  };

  return (
    <>
      <h4>Add City</h4>
      <div className="row">
        <div className="col-6">
          <Input
            label="City"
            placeholderText="Enter City Name"
            onChangeText={_handleChange}
            value={formData.cityName}
            name="cityName"
            isRequired
          />
        </div>
        <div className="col-6">
          <Input
            label="State"
            placeholderText="Enter State Name"
            onChangeText={_handleChange}
            value={formData.stateName}
            name="stateName"
            isRequired
          />
        </div>
        <div className="col-6">
          <Input
            label="Country"
            placeholderText="Enter Country Name"
            onChangeText={_handleChange}
            value={formData.countryName}
            name="countryName"
            isRequired
          />
        </div>
        <Spacer height="8px" />
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <Button
              type={BUTTON_TYPES.PRIMARY}
              btnText="Submit"
              onClick={_handleCityRegister}
            />
          </div>
          <div className="col-4"></div>
        </div>
        <Spacer height="16px" />
        <DataTable
          columns={columns(handleDelete)}
          data={city}
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
  );
};

export default AddCity;
