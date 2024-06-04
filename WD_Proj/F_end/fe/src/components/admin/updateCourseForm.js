import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateCourseForm = () => {
  const { courseID } = useParams();
  const token = useSelector((state) => state.user.token);
  const teachers = useSelector((state) => state.app.teachers);
  const existingCourse = useSelector((state) => state.app.courses.find(course => course.courseID === courseID));

  const formik = useFormik({
    initialValues: {
      courseID: existingCourse?.courseID || "",
      courseName: existingCourse?.courseName || "",
      department: existingCourse?.department || "",
      credits: existingCourse?.credits || "",
      teachers: existingCourse?.teachers.map(teacher => teacher._id) || [], // Initialize as an array
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5600/admin/updateCourse",
          values, { headers: { Authorization: `Bearer ${token}` }, }
        );

        if (response.status === 200) {
          NotificationManager.success(response.data.msg);
        } else {
          NotificationManager.error(response.data.msg || response.data.errorMsg);
        }
      } catch (error) {
        console.error("Error:", error);
        NotificationManager.error("An error occurred while updating the course.");
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
      <h2>Update Course</h2>
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
            disabled
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

export default UpdateCourseForm;
