import React from "react";
import StatusButton from "../../../components/status-button/StatusButton";
import DataTable from "react-data-table-component";

interface Row {
  subCategoryId:number;
  categoryName:string;
  categoryId: number;
  subCategroyName: string;
  status: boolean;
}

interface Column {
  name: string;
  selector: (row: Row) => string| number | JSX.Element;
}

const columns: Column[] = [
  {
    name: "Sub Category Id",
    selector: (row: Row) => row.subCategoryId,
  },
  {
    name: "Category Name",
    selector: (row: Row) => row.categoryName,
  },
  {
    name: "Sub Category",
    selector: (row: Row) => row.subCategroyName,
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
    categoryName:'Uniform', 
    subCategoryId: 23,
    categoryId: 4,
    subCategroyName: "Pant",
    status:true
  },
  {
    categoryName:"Stationery",
    subCategoryId: 53,
    categoryId: 9,
    subCategroyName: "Pen",
    status:true
  },
  {
    categoryName:"Book",
    subCategoryId: 14,
    categoryId: 4,
    subCategroyName: "Hindi Book",
    status:false
  },
  {
    categoryName:"Uniform",
    subCategoryId: 263,
    categoryId: 4,
    subCategroyName: "Tie",
    status:true
  },
  {
    categoryName:"Uniform",
    subCategoryId: 231,
    categoryId: 4,
    subCategroyName: "Full Shirt",
    status:false
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
      paddingTop:"5px", // override the cell padding for data cells
      paddingBottom:"5px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const SubCategoryTable =()=>{
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

export default SubCategoryTable;
