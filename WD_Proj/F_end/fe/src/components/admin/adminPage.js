// import { useSelector } from "react-redux"
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useEffect } from "react";
// import { setCourses, setSlots, setApplications } from "../redux/app.reducer";
// import { Box } from "@mui/material";


// const AdminPage = ()  => {
//     const token = useSelector((state) => state.user.token);
//     const dispatch = useDispatch();
//     const courses = useSelector((state) => state.app.courses);

//     useEffect(() => {
//         getData();
//     }, []);

//     const getData = async () => {
//         const response = await axios({
//           method: "GET",
//           url: "http://localhost:5600/admin/getCourses",  
//           headers: { Authorization: `Bearer ${token}`},
//         });
//         dispatch(setCourses(response.data.ingredients));
    
//     };

//     return(
//         <h1>I am user page</h1>
//     )


    





// };

// export default AdminPage;

const UserPage = () => {
    return (
        <h1>I am AdminPage page</h1>
    )
}

export default UserPage;