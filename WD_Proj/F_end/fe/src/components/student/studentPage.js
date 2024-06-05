import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import ApplyForSlotForm from './applyForSlotForm'; // Assuming ApplyForSlotForm is a separate component

const StudentPage = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [studentInfo, setStudentInfo] = useState(null);
  const [teachers, setTeachers] = useState([]); // State for teachers
  const [showApplyForSlot, setShowApplyForSlot] = useState(false); // State for button visibility
  const [dataLoading, setDataLoading] = useState(false); // State for data loading

  useEffect(() => {
    // Fetch student info when component mounts
    axios
      .get('http://localhost:5600/student/getStudentInfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStudentInfo(response.data.stv);
        console.log('Success');
      })
      .catch((error) => {
        console.error('Error fetching student info:', error);
      });
  }, []);

  const handleGetAllTeachersClick = async () => {
    try {
      setDataLoading(true); // Set data loading state to true
      const response = await axios.get('http://localhost:5600/student/getAllTeachers');
      setTeachers(response.data.tv);
      setDataLoading(false); // Set data loading state to false after request (success or fail)
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleShowApplySlot = () => {
    setShowApplyForSlot(!showApplyForSlot); // Toggle showApplyForSlot state
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Student Dashboard</Typography>
      {studentInfo ? (
        <div>
          <Typography variant="body1">
            Name: {studentInfo.firstName} {studentInfo.lastName}
          </Typography>
          {/* Display other student info here... */}
          <Button variant="contained" onClick={handleGetAllTeachersClick}>
            Show All Teachers
          </Button>
          <Button variant="contained"  onClick={handleShowApplySlot}>
            Apply for Slot
          </Button>
          {showApplyForSlot && <ApplyForSlotForm />}
          {/* Conditionally render loading message or teacher list */}
          {dataLoading ? (
            <Typography variant="body1">Loading teachers...</Typography>
          ) : (
            teachers.length > 0 ? (
              <ul>
                {teachers.map((teacher) => (
                  <li key={teacher.email}>
                    {teacher.firstName} {teacher.lastName}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1">No teachers found.</Typography>
            )
          )}
        </div>
      ) : (
        <Typography variant="body1">Loading student info...</Typography>
      )}
    </Box>
  );
};

export default StudentPage;
