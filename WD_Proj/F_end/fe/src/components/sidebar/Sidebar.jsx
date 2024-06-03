import { Link } from "react-router-dom";
import "./sidebar.css";
import { LineStyle, Timeline, TrendingUp } from "@mui/icons-material";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>

            <Link to="/admin/courses" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Courses
            </li>
            </Link>

            <Link to="/admin/teachers" className="link">
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Teachers
            </li>
            </Link>


          </ul>
        </div>
        
        
        
      </div>
    </div>
  );
}