import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Register = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleRegister = async () => {
        try {
            const res = await axiosInstance.post("/api/auth/register", { name, email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/login");
        } catch (error) {
            console.log(error.response.data.message);
            
            setMessage(error.response.data.message);
            
        }
    };
  
    return (
        <div className="flex flex-col items-center mt-20">
        <h1 className="text-2xl mb-5">Register</h1>
        {message && <p className="text-red-500 mb-2 font-thin">{message}</p>}
        <input
          type="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border mb-2 w-64 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border mb-2 w-64 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border mb-4 w-64 rounded"
        />
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>
        <p>Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
      </div>
    );
  };
  

export default Register;