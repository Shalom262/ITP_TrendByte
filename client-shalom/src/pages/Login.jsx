import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { data, useNavigate } from 'react-router-dom';
import { AppContent } from "../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate()

    const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent) // to get data from context (backend url)
  
    const [state, setState] = useState("Login"); //initially it'll shows the sign up message
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const onSubmitHandler = async (e)=>{
      try {
        e.preventDefault();

        axios.defaults.withCredentials = true; // to send cookies with credentials

        if(state === 'Sign Up'){

          const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password, confirmpassword})

          if (data.success){
            setIsLoggedin(true)
            getUserData()
            navigate('/')
          }
          else{
            toast.error(data.message);
          }
        }
        else{
          const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

          if (data.success){
            setIsLoggedin(true)
            getUserData()
            navigate('/') //navigate to home page
          }
          else{
            toast.error(data.message);
          }

        }
      } catch (error) {
        toast.error(error.message);
      }
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <img
        onClick={()=>navigate('/')} //open home page
        src={assets.logo_tb2}
        alt=""
        className="absolute left-5 sm:left-20 w-49 sm:w-60 top-5 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to Your Account!"}
        </p>

        <form onSubmit={onSubmitHandler}>

            {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                onChange={e => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name" required/>
            </div>
        )}

            

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.mail_icon} alt="" />
                <input 
                onChange={e => setEmail(e.target.value)}
                value={email}
                className="bg-transparent outline-none"
                type="email"
                placeholder="Email ID" required/>
            </div>

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="" />
                <input 
                onChange={e => setPassword(e.target.value)}
                value={password}
                className="bg-transparent outline-none"
                type="password"
                placeholder="Password" required/>
            </div>

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="" />
                <input 
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmpassword}
                className="bg-transparent outline-none"
                type="password"
                placeholder="Confirm Password" required/>
            </div>
            

            <p onClick={()=>navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot Password?</p>

            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>

        </form>

        {state === 'Sign Up' ? (
        <p className="text-gray-400 text-center text-s mt-4">Already have an account?{' '}
            <span onClick={()=> setState('Login')}
            className="text-blue-400 cursor-pointer underline">Login here</span>
        </p>
        )
        : (
        <p className="text-gray-400 text-center text-s mt-4">Don't have an account?{' '}
            <span onClick={()=> setState('Sign Up')}
            className="text-blue-400 cursor-pointer underline">Sign Up</span>
        </p>
    )}

        

        

      </div>
    </div>
  );
};

export default Login;
