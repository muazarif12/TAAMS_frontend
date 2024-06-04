import AuthPage from './components/auth';
import './App.css';
import { NotificationContainer } from 'react-notifications';
import AdminPage from './components/admin/adminPage';
import TeacherPage from './components/teacher/teacherPage';  // Import TeacherPage component
import StudentPage from './components/student/studentPage';  // Import StudentPage component
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import Courses from './components/admin/pages/courses/Courses';
import Teachers from './components/admin/pages/teachers/Teachers';
import AddCourseForm from './components/admin/addCourseForm';
import UpdateCourseForm from './components/admin/updateCourseForm';

function App() {
  
  const { loggedIn, role } = useSelector((state) => state.user);

    return (
    <Router>
      <Routes>
        
        <Route path="/" element={<AuthPage />} />
        
        <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage/>} /> 
          <Route path ="/admin/courses" element={<Courses/>} />
          <Route path ="/admin/courses/add" element={<AddCourseForm/>} />
          <Route path ="/admin/courses/update/:courseID" element={<UpdateCourseForm/>} />
          <Route path ="/admin/teachers" element={<Teachers/>} />
        </Route>
        
        <Route element={<ProtectedRoutes allowedRoles={['teacher']} />}>
          <Route path="/teacher" element={<TeacherPage />} />

        </Route>
        
        <Route element={<ProtectedRoutes allowedRoles={['student']} />}>
          <Route path="/student" element={<StudentPage />} />
          
        </Route>
      
      </Routes>
      <NotificationContainer />
    </Router>

  );
  
}

export default App;
