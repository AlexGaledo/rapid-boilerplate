
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import { createContext } from "react";
import { useState } from "react";
import Debug from "./pages/debug";

export const loginContext = createContext();

export default function App(){
  const [loginStatus, setLoginStatus] = useState(false);
  
  return(
    <loginContext.Provider value={{loginStatus, setLoginStatus}}>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="nice" element={<Debug/>}/>
    </Routes>
    </loginContext.Provider>
  )
}
