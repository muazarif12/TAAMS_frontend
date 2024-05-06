import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { setCourses } from "../../redux/app.reducer"; // Import setCourses from app.reducer

const UpdateCourseForm = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      courseID: window.location.pathname.split("/").pop(), // Get courseID from URL
      name: "",
      department: "",
      credits: ""
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`http://localhost:5600/admin/updateCourse/${values.courseID}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.msg === "Course updated" && response.status === 200) {
          NotificationManager.success(response.data.msg);
          dispatch(setCourses(response.data.courses)); // Dispatch setCourses action with updated courses
        } else {
          NotificationManager.error(response.data.msg || response.data.msg);
        }
      } catch (error) {
        console.error("Error:", error);
        NotificationManager.error("An error occurred while updating the course.");
      }
    }
  });

  return (
    <h1>I am update course page</h1>
  );
};

export default UpdateCourseForm;
