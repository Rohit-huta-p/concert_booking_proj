import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import { GlobalContext } from "./GlobalContext";
import { useContext, useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Theaters from "./components/Theaters";
import Seats from "./components/Seats";
import verifyToken from "./utils/verifToken";


function App() {
  const {user, setUser, concerts} = useContext(GlobalContext);
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    verifyToken(isLogin, setIsLogin);
    
  }, [navigate])

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>

      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/">Home</Link>
        {user ? <span>Welcome, {user.email}</span> : 
          isLogin ? (
            <button onClick={logout} className="cursor-pointer">Logout</button>
          ) : (
            <div>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )
        }
      </nav>
      <Routes>
      {
        isLogin ? (
          <>
            <Route path="/" element={<Home  concerts={concerts} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="*" element={<Login setUser={setUser} />} />

          </>
        )
      }


      </Routes>

    </>
  )
}

export default App
