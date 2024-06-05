import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import React from 'react'
import './featuredInfo.css'


export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Students</span>
        <div className="featuredTotalContainer">
          <span className="featuredTotal">450</span>
          
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Teachers</span>
        <div className="featuredTotalContainer">
          <span className="featuredTotal">58</span>
          
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Courses</span>
        <div className="featuredTotalContainer">
          <span className="featuredTotal">50</span>
          
        </div>
      </div>
    </div>
  )
}
