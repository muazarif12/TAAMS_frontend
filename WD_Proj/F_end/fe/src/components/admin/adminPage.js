import Topbar from '../topbar/Topbar'; // Import the Topbar component
import Sidebar from "../sidebar/Sidebar";
import "./aP.css";
import Home from "./pages/home/Home";

const AdminPage = () => {
  

  return (
    <div>      
      <Topbar />
    <div className="container">
        <Sidebar />
        <Home/>
        
      </div>
    </div> 
  );
};

export default AdminPage;
