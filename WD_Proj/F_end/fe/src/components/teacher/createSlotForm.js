import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../../redux/teacher.reducer";

const AddSlot = () => {
  const token = useSelector((state) => state.user.token);
  const courses = useSelector((state) => state.teacher.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch courses assigned to the teacher when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5600/teacher/getCoursesByTeacher",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setCourses(response.data.courses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [dispatch, token]);

  const formik = useFormik({
    initialValues: {
      courseId: "", // Corrected the field name
      // Add other slot related fields here (e.g., name, date, time)
    },
    onSubmit: async (values) => {
      const response = await axios.post(
        "http://localhost:5600/teacher/createSlot",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.msg === "SLOT CREATED") {
        NotificationManager.success("Slot created successfully!");
        // Clear form after successful creation (optional)
        formik.resetForm();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="name" // Add name attribute for other slot related fields
        onChange={formik.handleChange}
        // Add other slot related fields here (e.g., name, date, time)
      />
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel>Courses</InputLabel>
        <Select
          name="courseId" // Corrected the name attribute
          value={formik.values.courseId}
          onChange={formik.handleChange}
          input={<OutlinedInput label="Courses" />}
        >
          {courses.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.courseName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Add Slot
      </Button>
    </form>
  );
};

export default AddSlot;
