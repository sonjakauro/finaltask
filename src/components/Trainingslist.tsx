import { useEffect, useState } from "react";
import type { Training } from "../types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { fetchTrainings, deleteTraining } from "../api";
import Button from "@mui/material/Button";
import { parseISO, format } from "date-fns";


//importin tyyli löytyy documentationista


function Trainingslist() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const columns: GridColDef[] = [
        { field: "date", headerName: "Date", width: 200, valueFormatter: (value) => format(parseISO(value), "dd.MM.yyyy HH:mm")},
        { field: "duration", headerName: "Duration (min)", width: 150 },
        { field: "activity", headerName: "Activity", width: 150 },
        { field: "customer", headerName: "Customer", width: 150,  valueGetter: (value: any) => {
      return `${value.firstname} ${value.lastname}` }, },
        {
            field: "id",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) =>
                <Button
                    color="error"
                    size="small"
                    onClick={() => handelDelete(params.id as string)}>
                    Delete
                </Button>
        }
    ]

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const handelDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(id)
                .then(() => getTrainings())
                .catch(err => console.error(err))
        }
    }

    return (
        <>
            <div style={{ width: '100%', height: 500 }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={row => row.id}
                    autoPageSize
                />
            </div>
        </>
    )
}

export default Trainingslist;