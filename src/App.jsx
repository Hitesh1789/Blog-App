import { useEffect, useState } from 'react'
import './App.css'
import { Footer, Header } from './components/index'
import { Outlet } from "react-router-dom"
import { login, logout } from "./store/authSlice"
import authSerivce from './appwrite/auth';
import { useDispatch } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authSerivce.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        }
        else {
          dispatch(logout())
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    loading ? (<div className="flex items-center justify-center h-screen">
      <div className="font-medium text-2xl">
        Loading...
      </div>
    </div>) :
      (<>
      
        <Header />
        <Outlet />
        <Footer />
      </>)
  )
}

export default App