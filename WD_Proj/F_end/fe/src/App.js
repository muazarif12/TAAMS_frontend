import AuthPage from './components/auth';
import { NotificationContainer } from 'react-notifications';
import AdminPage from './components/admin/adminPage';
import TeacherPage from './components/teacher/teacherPage';  // Import TeacherPage component
import StudentPage from './components/student/studentPage';  // Import StudentPage component
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/utils/ProtectedRoutes';

function App() {
  
  const { loggedIn, role } = useSelector((state) => state.user);

    return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} /> 
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
