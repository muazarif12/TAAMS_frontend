import React from "react";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { setCourses } from "../../redux/app.reducer";

const AddCourseForm = () => {
  const token = useSelector((state) => state.user.token);
  const courses = useSelector((state) => state.app.courses);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5600/admin/addCourse", values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.msg === "COURSE ADDED" && response.status === 200) {
        NotificationManager.success(response.data.msg);
        dispatch(setCourses([...courses, response.data.course]));
      } else {
        NotificationManager.error(response.data.msg || response.data.errorMsg);
      }
    } catch (error) {
      console.error("Error:", error);
      NotificationManager.error("An error occurred while adding the course.");
    }
  };

  const formik = useFormik({
    initialValues: {
      courseID: "",
      courseName: "",
      department: "",
      credits: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={formik.handleSubmit}>
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
        <div>
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.courseName}
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.department}
          />
        </div>
        <div>
          <label htmlFor="credits">Credits</label>
          <input
            id="credits"
            name="credits"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.credits}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourseForm;
