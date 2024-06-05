import React, { useEffect, useState } from 'react'
import './featuredInfo.css'
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function FeaturedInfo() {
  const token = useSelector((state) => state.user.token);
  const [totals, setTotals] = useState({ students: 0, teachers: 0, courses: 0 });

  useEffect(() => {
    

    const fetchTotals = async () => {
      const response = await axios({
          method: "GET",
          url: "http://localhost:5600/admin/totals",
          headers: { Authorization: `Bearer ${token}` },
      });
      setTotals(response.data);
  };

    fetchTotals();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Students</span>
        <div className="featuredTotalContainer">
          <span className="featuredTotal">{totals.students}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Teachers</span>
        <div className="featuredTotalContainer">
          <span className="featuredTotal">{totals.teachers}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Courses</span>
        <div className="featuredTotalContainer">
          <span className="featuredTotal">{totals.courses}</span>
        </div>
      </div>
    </div>
  );
}