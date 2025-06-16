
import { useContext, useState } from "react";
import axios from "../api/axios"
import { loginContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const {setLoginStatus} = useContext(loginContext)
    const [formRegistate, setFormRegistate] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    //interact with login/ route from backend
    const loginForm = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("/login/",{
                username,
                password,
            });
            localStorage.setItem("token",response.data.access_token);
            setLoginStatus((prev) => !prev); 
            alert("logged in successfoley");
            navigate('/nice');
        }catch(err){
            const msg = err?.response?.data?.response || err?.message || "Unexpected error.";
            alert(msg);
        }
    }


    //interact w register route from backend
    const registerForm = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/register/",{
                username,
                password,
            });
            localStorage.setItem("token",response.data.access_token);
            alert("account created");
        }catch(err){
            const msg = err?.response?.data?.response || err?.message || "Unexpected error.";
            alert(msg);
        }
    }

    const togglePage = () =>{
        setFormRegistate(!formRegistate);
    }

     if (!formRegistate){
        return(
            <>
            <div className="login-page">
                <h1 >😎</h1>
                <form onSubmit={loginForm} className="login-box">
                    <input type="text" className="login-username" placeholder="input username here" 
                    value={username} onChange={(e)=>setUsername(e.target.value)} required/> 
                    <input type="text" className="login-password" placeholder="input password here" 
                    value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button className="submitLogin">Login</button>
                </form>
                <h3 className="toggleText" onClick={togglePage}>don’t have account yet?, click here</h3>
            </div>
            </>
        );}
    else{
        return(
            <>
            <div className="register-page">
                <h1 >😎</h1>
                <form onSubmit={registerForm} className="register-box">
                    <input type="text" className="register-username" placeholder="input username here"
                    value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                    <input type="text" className="register-password" placeholder="input password here"
                    value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button className="submitRegister">Register</button>
                </form>
                <h3 className="toggleText" onClick={togglePage}>already have an account?, click here</h3>
            </div>
            </>
        );}
}