const UpdateCourseForm = ()  => {
    const token = useSelector((state) => state.user.token);

    
    const useFormik = useFormik({
        initialValues: {
          courseID: url.courseID,
          name: "",
          department: "",
          credits:""
        },
        onSubmit: async (values) => {
          const response = await axios({
            method: "POST",
            url: "http://localhost:5600/admin/updateCourse/:courseID",
            data: values,
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.msg === "Course updated" && response.status === 200) {
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

export default UpdateCourseForm; 