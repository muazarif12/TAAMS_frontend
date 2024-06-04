import Topbar from '../topbar/Topbar'; // Import the Topbar component
import Sidebar from "../sidebar/Sidebar";
import "./aP.css";
import Home from "./pages/home/Home";
import BasicDateCalendar from "../Calender/Calender";

const AdminPage = () => {
  

  return (
    <div>      
      <Topbar />
    <div className="container">
        <Sidebar />
        <Home/>
        
        {/* <BasicDateCalendar /> */}
      </div>
    </div> 
  );
};

export default AdminPage;
