import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setCourses, setSlots, setApplications } from "../../redux/app.reducer"; // Assuming these reducers are in app.reducer.js
import { Box, Grid, Paper, Typography } from "@mui/material";

import AddCourseForm from "./addCourseForm"; // Assuming addCourseForm is in the same directory
import AssignTeacherToCourseForm from "./assignTeacherToCourseForm"; // Assuming assignTeachertoCourseForm is in the same directory
import UpdateCourseForm from "./updateCourseForm"; // Assuming updateCourseForm is in the same directory

import Topbar from '../topbar/Topbar'; // Import the Topbar component
import Sidebar from "../sidebar/Sidebar";
import "./aP.css";
import Home from "./pages/home/Home";
import BasicDateCalendar from "../Calender/Calender";

const AdminPage = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.app.courses);
  const [coursesData, setCoursesData] = useState([]); // Local state to store retrieved courses

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios({
      method: "GET",
      url: "http://localhost:5600/admin/getCourses",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setCourses(response.data.cv)); // Dispatch courses to Redux store
    setCoursesData(response.data.cv); // Update local state for display
  };

  return (
    // <Box sx={{ padding: 2 }}>
    //   <Typography variant="h4">Admin Dashboard</Typography>

    //   <Grid container spacing={2}>
    //     <Grid item xs={12}>
    //       <h2>Course Management</h2>
    //       <AddCourseForm />
    //       <AssignTeacherToCourseForm />
    //     </Grid>
    //     <Grid item xs={12}>
    //       <h2>Existing Courses</h2>
    //       {coursesData.length > 0 ? (
    //         coursesData.map((course) => (
    //           <Paper key={course._id} sx={{ padding: 2, mb: 2 }}>
    //             <Grid container spacing={2}>
    //               <Grid item xs={6}>
    //                 <Typography variant="body1">{course.courseName}</Typography>
    //               </Grid>
    //               <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
    //                 <UpdateCourseForm course={course} />
    //               </Grid>
    //             </Grid>
    //           </Paper>
    //         ))
    //       ) : (
    //         <Typography variant="body1">No courses found.</Typography>
    //       )}
    //     </Grid>
    //   </Grid>
    // </Box>
    <div>      
      <Topbar />
    <div className="container">
        <Sidebar />
        <Home/>
        
        {/* <BasicDateCalendar /> */}
      </div>
    </div> 
  );
};

export default AdminPage;
