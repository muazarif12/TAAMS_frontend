// StudentPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import ApplyForSlotPage from './applyForSlotForm';

const StudentPage = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        // Fetch student info when component mounts
        axios.get('http://localhost:5600/student/getStudentInfo', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setStudentInfo(response.data.stv);
            console.log("Success");
        })
        .catch(error => {
            console.error('Error fetching student info:', error);
        });
    }, []);

    

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Student Dashboard</Typography>
            {studentInfo ? (
                <div>
                    <Typography variant="body1">Name: {studentInfo.firstName} {studentInfo.lastName}</Typography>
                    // Display other student info here...
                    <Button variant="contained" onClick={ApplyForSlotPage}>
                        Apply for Slot
                    </Button> {/* Add this button */}
                </div>
            ) : (
                <Typography variant="body1">Loading student info...</Typography>
            )}
        </Box>
    );
};

export default StudentPage;
