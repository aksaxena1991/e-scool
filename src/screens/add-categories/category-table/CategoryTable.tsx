import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "./categoryTable.css";
import StatusButton from "../../../components/status-button/StatusButton";

interface Row {
  categoryId: number;
  categroyName: string;
  status: boolean;
}

interface Column {
  name: string;
  selector: (row: Row) => string| number | JSX.Element;
}

const columns: Column[] = [
  {
    name: "Category Id",
    selector: (row: Row) => row.categoryId,
  },
  {
    name: "Category",
    selector: (row: Row) => row.categroyName,
  },
  {
    name: "Status",
    selector: (row: Row) => (
      <StatusButton status={row.status}/>
    ),
  },
];

const rows: Row[] = [
  {
    categoryId: 4,
    categroyName: "Uniform",
    status:true
  },
  {
    categoryId: 53,
    categroyName: "Shoes",
    status:true
  },
  {
    categoryId: 14,
    categroyName: "Books",
    status:false
  },
  {
    categoryId: 263,
    categroyName: "Stationery",
    status:true
  },
  {
    categoryId: 231,
    categroyName: "Bags",
    status:false
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "45px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "18px",
      fontWeight: 700,
      backgroundColor: "#ebebeb",
      color: "#5c5a5a",
      fontFamily: "nunito",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      paddingLeft: "8px",
      paddingTop:"5px",
      paddingBottom:"5px", 
      paddingRight: "8px",
    },
  },
};

const CategoryTable =()=>{
  return <DataTable
  columns={columns as any}
  data={rows}
  selectableRows
  selectableRowsHighlight
  highlightOnHover
  customStyles={customStyles}
  fixedHeader
  fixedHeaderScrollHeight="400px"
  pagination
/>;
}

export default CategoryTable;
