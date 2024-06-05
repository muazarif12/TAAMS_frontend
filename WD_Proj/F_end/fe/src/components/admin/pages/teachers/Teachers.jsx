import React, { useEffect, useState } from 'react'
import Topbar from '../../../topbar/Topbar'
import Sidebar from '../../../sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, setTeachers } from '../../../../redux/app.reducer';
import axios from 'axios';
import DataTableTeachers from './teachersInfo';

export default function Teachers() {

  const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.app.courses);
    const [coursesData, setCoursesData] = useState([]); // Local state to store retrieved courses
    const teachers = useSelector((state) => state.app.teachers);
    const [teachersData, setTeachersData] = useState([]); // Local state to store retrieved teachers


  useEffect(() => {
    getData1();
}, []);



const getData1 = async () => {
    const response = await axios({
        method: "GET",
        url: "http://localhost:5600/admin/getTeachers",
        headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setTeachers(response.data.tv)); // Dispatch courses to Redux store
    setTeachersData(response.data.tv); // Update local state for display
};



  return (
    <div>      
      <Topbar />
    <div className="container">
        <Sidebar />
        <DataTableTeachers data={teachersData} token={token}/>
      </div>
    </div> 
  )
}
