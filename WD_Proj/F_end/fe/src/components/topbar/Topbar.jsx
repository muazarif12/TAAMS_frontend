import React from "react";
import "./topbar.css";
import { Settings } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">TAAMS</span>
        </div>
        <div className="topRight">
          
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}