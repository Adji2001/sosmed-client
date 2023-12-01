import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messanger from "./pages/Messanger";

function App() {
  const user = useSelector((states) => states.authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: 'PRELOAD'})
  }, [dispatch])

  return (
    <div className="h-[100vh] flex bg-cover bg-center p-10" style={{backgroundImage: `url('${import.meta.env.VITE_CURRENT_URI}cyberpunk.jpg')`}}>

          {user && <Sidebar />}
          <Routes>
            <Route path={`/profile/:${'username' || 'userId'}`} element={user && <Profile />} />
            <Route path="/messanger" element={user && <Messanger />} />
            <Route index path="/" element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to='/' /> } />
          </Routes>

    </div>
  );
}

export default App;
