import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import AuthPage from './components/auth'
import { NotificationContainer } from 'react-notifications'


function App () {
 

  return (
    <div>
      <AuthPage />
      <NotificationContainer/>
    </div>

  )
}

export default App