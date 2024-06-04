import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, setTeachers } from "../../../../redux/app.reducer";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Topbar from "../../../topbar/Topbar";
import Sidebar from "../../../sidebar/Sidebar";
import DataTable from "./coursesInfo";

const Courses = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.app.courses);
    const [coursesData, setCoursesData] = useState([]); // Local state to store retrieved courses
    const teachers = useSelector((state) => state.app.teachers);
    const [teachersData, setTeachersData] = useState([]); // Local state to store retrieved teachers

    useEffect(() => {
        getData();
        getData1();
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

    const getData1 = async () => {
        const response = await axios({
            method: "GET",
            url: "http://localhost:5600/admin/getTeachers",
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setTeachers(response.data.tv)); // Dispatch courses to Redux store
        setTeachersData(response.data.tv); // Update local state for display
    };

    return (
        <div>
            <Topbar />
            <div className="container">
                <Sidebar />
                <DataTable data={coursesData} token={token} /> {/* Pass coursesData to DataTable */}
            </div>
        </div>
    );
};

export default Courses;
































































        // <Box sx={{ padding: 2 }}>
        //   <Typography variant="h4">Admin Dashboard</Typography>
        //   <div>      
        //   <Topbar />
        // <div className="container">
        //     <Sidebar />
        //   </div>
        // </div> 
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

    