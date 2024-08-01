import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer,Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-w-full flex flex-1 flex-wrap content-center bg-white'>
      <div className='w-full block m-0'>
        <Header />
        <main className='w-full min-h-screen bg-[#bc382e] ' >
        <Outlet />
        </main>
        <Footer />
       
      </div>
    </div>
  ) : null
}

export default App
