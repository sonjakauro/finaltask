import { useEffect, useState } from "react";
import type { Customer } from "../types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { fetchCustomers, deleteCustomer } from "../api";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

//importin tyyli löytyy documentationista


function Customerlist() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First name", width: 150 },
        { field: "lastname", headerName: "Last name", width: 150 },
        { field: "streetaddress", headerName: "Address", width: 150 },
        { field: "postcode", headerName: "Postal code", width: 150 },
        { field: "city", headerName: "City", width: 150 },
        { field: "email", headerName: "Email address", width: 150 },
        { field: "phone", headerName: "Phone number", width: 150 },
        {
            field: "_links.self.href",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) =>
                <Button 
                color="error" 
                size="small" 
                onClick={() => handelDelete(params.id as string)}>
                    Delete
                </Button>
        },
        {field: "_links.customer.href",
            headerName: "EDIT",
            renderCell: (params: GridRenderCellParams) => 
                <EditCustomer getCustomers={getCustomers} CustomerRow={params.row}/> 
        }
        {field: "_links.customer.href",
            headerName: "ADD training",
            renderCell: (params: GridRenderCellParams) => 
                <EditCustomer getCustomers={getCustomers} CustomerRow={params.row}/> 
        }
    ]

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const handelDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
        deleteCustomer(url)
            .then(() => getCustomers())
            .catch(err => console.error(err))
        }
    }

    return (
        <>
        <AddCustomer getCustomers={getCustomers} />
            <div style={{ width: '100%', height: 500 }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                />
            </div>
        </>
    )
}

export default Customerlist;