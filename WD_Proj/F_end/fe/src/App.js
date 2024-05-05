import AuthPage from './components/auth'
import { NotificationContainer } from 'react-notifications'
import AdminPage from './components/admin/adminPage'
import { useSelector } from 'react-redux'


function App() {
  const { loggedIn } = useSelector((state) => state.user);
   
  return (
    <div className="App">
      {loggedIn ? <AdminPage /> : <AuthPage />}
      <NotificationContainer />
    </div>
  );
}

export default App