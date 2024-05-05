import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";


const assignCourseToTeacherForm = ()  => {
    const token = useSelector((state) => state.user.token);

    
    const formik = useFormik({
        initialValues: {
          teacherEmail: "",
          courseID: "",
          
        },
        onSubmit: async (values) => {
          const response = await axios({
            method: "POST",
            url: "http://localhost:5600/admin/assignCourseToTeacher",
            data: values,
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.msg === "COURSE ASSIGNED TO TEACHER" && response.status === 200) {
            NotificationManager.success(response.data.msg);
            dispatch(login(response.data.token));
          }
          else { NotificationManager.error(response.data.msg || response.data.msg) 
          
          }
    }
    
});

    return(
        <h1>I am user page</h1>
    )
};

export default assignCourseToTeacherForm;