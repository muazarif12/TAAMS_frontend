import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { DataGrid } from "@mui/x-data-grid";
import "./teachers.css"

const DataTableTeachers = ({ data, token }) => {
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
      const formattedRows = data.map((teacher, index) => ({
        id: index + 1, // Index-based ID for DataGrid rows
        email: teacher.email, // Unique identifier
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        department: teacher.department,
        
      }));
      setRows(formattedRows);
    }, [data]);
  
    const handleDelete = async (email) => {
      try {
        console.log(`Attempting to delete teacher with email: ${email}`);
        console.log(`Token: ${token}`);
  
        const response = await axios.post("http://localhost:5600/admin/deleteTeacher", 
        {
          email: email
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200 && response.data.msg === "TEACHER DELETED") {
          NotificationManager.success('Teacher deleted successfully');
          setRows(rows.filter(row => row.email !== email));
        } else {
          NotificationManager.error(response.data.msg || 'Failed to delete teacher');
        }
      } catch (error) {
        console.error("Error:", error);
        NotificationManager.error('An error occurred while deleting the teacher');
      }
    };
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 240 },
      { field: 'email', headerName: 'Email', width: 240 },
      { field: 'firstName', headerName: 'First Name', width: 300 },
      { field: 'lastName', headerName: 'Last Name', width: 300 },
      { field: 'department', headerName: 'Department', width: 160 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.row.email)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
        
      </div>
    );
  };
  
  export default DataTableTeachers;