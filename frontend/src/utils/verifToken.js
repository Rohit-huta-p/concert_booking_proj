import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useEffect } from "react";

const verifyToken = (isLogin, setIsLogin) => {

    const token = localStorage.getItem("token");
    if (token) {
      try { 
        const decoded = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        console.log(decoded);
        
        if (decoded.exp < now) {
          localStorage.removeItem("token");

          setIsLogin(false)
        }
        setIsLogin(true)
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");

        setIsLogin(false)
      }
    } else {

        setIsLogin(false)
    }

}

export default verifyToken;

