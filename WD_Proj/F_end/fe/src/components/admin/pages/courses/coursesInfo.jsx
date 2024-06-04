import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import "./courses.css";

const DataTable = ({ data, token }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const formattedRows = data.map((course, index) => ({
      id: index + 1, // Index-based ID for DataGrid rows
      courseID: course.courseID, // Unique identifier
      courseName: course.courseName,
      department: course.department,
      credits: course.credits,
      teachers: course.teachers.map(teacher => `${teacher.firstName} ${teacher.lastName}`).join(', '), // Join teacher names as a string
    }));
    setRows(formattedRows);
  }, [data]);

  const handleDelete = async (courseID) => {
    try {
      console.log(`Attempting to delete course with ID: ${courseID}`);
      console.log(`Token: ${token}`);

      const response = await axios.post("http://localhost:5600/admin/deleteCourse", 
      {
        courseID: courseID
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.msg === "COURSE DELETED") {
        NotificationManager.success('Course deleted successfully');
        setRows(rows.filter(row => row.courseID !== courseID));
      } else {
        NotificationManager.error(response.data.msg || 'Failed to delete course');
      }
    } catch (error) {
      console.error("Error:", error);
      NotificationManager.error('An error occurred while deleting the course');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 240 },
    { field: 'courseID', headerName: 'Course ID', width: 240 },
    { field: 'courseName', headerName: 'Course Name', width: 300 },
    { field: 'department', headerName: 'Department', width: 160 },
    { field: 'credits', headerName: 'Credits', width: 80, sortable: false },
    { field: 'teachers', headerName: 'Teachers', width: 340 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/courses/update/" + params.row.courseID}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.courseID)}
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
      <Link to={"/admin/courses/add"}>
        <button className="AddCourseButton">Add Course</button>
      </Link>
    </div>
  );
};

export default DataTable;
