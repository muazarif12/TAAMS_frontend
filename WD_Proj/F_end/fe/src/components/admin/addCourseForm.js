import React from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Button, TextField } from "@mui/material";

const AddCourseForm = () => {
  const token = useSelector((state) => state.user.token);
  const teachers = useSelector((state) => state.app.teachers);

  const formik = useFormik({
    initialValues: {
      courseID: "",
      courseName: "",
      department: "",
      credits: "",
      teachers: [], // Initialize as an array
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5600/admin/addCourse", values, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.msg === "COURSE ADDED" && response.status === 200) {
          NotificationManager.success(response.data.msg);
        } else {
          NotificationManager.error(response.data.msg || response.data.errorMsg);
        }
      } catch (error) {
        console.error("Error:", error);
        NotificationManager.error("An error occurred while adding the course.");
      }
    },
  });

  const handleTeacherChange = (event) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue("teachers", typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            fullWidth
            id="courseID"
            name="courseID"
            label="Course ID"
            value={formik.values.courseID}
            onChange={formik.handleChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="courseName"
            name="courseName"
            label="Course Name"
            value={formik.values.courseName}
            onChange={formik.handleChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="department"
            name="department"
            label="Department"
            value={formik.values.department}
            onChange={formik.handleChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="credits"
            name="credits"
            label="Credits"
            type="number"
            value={formik.values.credits}
            onChange={formik.handleChange}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Teachers</InputLabel>
            <Select
              multiple
              value={formik.values.teachers}
              onChange={handleTeacherChange}
              input={<OutlinedInput label="Teachers" />}
              renderValue={(selected) => selected.map(id => teachers.find(t => t._id === id)?.firstName).join(", ")}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  <Checkbox checked={formik.values.teachers.includes(teacher._id)} />
                  <ListItemText primary={teacher.firstName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
