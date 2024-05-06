import AuthPage from './components/auth';
import { NotificationContainer } from 'react-notifications';
import AdminPage from './components/admin/adminPage';
import TeacherPage from './components/teacher/teacherPage';  // Import TeacherPage component
import StudentPage from './components/student/studentPage';  // Import StudentPage component
import { useSelector } from 'react-redux';

function App() {
  const { loggedIn, role } = useSelector((state) => state.user);

  return (
    <div className="App">
      {loggedIn ? (
        role === 'admin' ? (
          <AdminPage /> // Render AdminPage for admin role
        ) : role === 'teacher' ? (
          <TeacherPage /> // Render TeacherPage for teacher role (assuming it exists)
        ) : role === 'student' ? (
          <StudentPage /> // Render StudentPage for student role (assuming it exists)
        ) : (
          <p>Invalid Role</p> // Handle unexpected roles
        )
      ) : (
        <AuthPage /> // Render AuthPage if not logged in
      )}
      <NotificationContainer />
    </div>
  );
}

export default App;
