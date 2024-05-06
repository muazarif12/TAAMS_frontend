import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../../redux/teacher.reducer.js";

const AssignTeacherToCourseForm = () => {
  const token = useSelector((state) => state.user.token);
  const courses = useSelector((state) => state.app.courses); // Update to match the correct slice name in Redux store
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      teacherEmail: "",
      courseID: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5600/admin/assignCourseToTeacher", values, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.msg === "COURSE ASSIGNED TO TEACHER" && response.status === 200) {
          NotificationManager.success(response.data.msg);

          // Dispatch setCourses action to update courses in Redux store
          dispatch(setCourses([...courses, response.data.course]));
        } else {
          NotificationManager.error(response.data.msg || response.data.errorMsg);
        }
      } catch (error) {
        console.error("Error:", error);
        NotificationManager.error("An error occurred while assigning the course.");
      }
    },
  });

  return (
    <>
      <h1>Assign Course to Teacher</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="teacherEmail">Teacher Email</label>
          <input
            id="teacherEmail"
            name="teacherEmail"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.teacherEmail}
          />
        </div>
        <div>
          <label htmlFor="courseID">Course ID</label>
          <input
            id="courseID"
            name="courseID"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.courseID}
          />
        </div>
        <button type="submit">Assign Course</button>
      </form>
    </>
  );
};

export default AssignTeacherToCourseForm;
