import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import  axios  from 'axios';
import { toast } from 'react-toastify';



const ResetPassword = () => {

  const {backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]); // store otp in a varaiable

  const handleInput = (e, index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  } // to manually move the text field while entering otp in otp page

  const handleKeyDown = (e, index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  } // to manually delete the text field while deleting a number in otp page


  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  } // to automatically fill the fields when copy and paste the otp from email


  const onSubmitEmail = async (e)=>{
    e.preventDefault();

    try {
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message);
    }
  } // handler function for submit email


  const onSubmitOtp = async (e)=>{
    e.preventDefault();

    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  } // handler function for submit otp

  const onSubmitNewPassword = async (e)=>{
    e.preventDefault();

    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword});
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message);
    }

  } // handler function for submit new password




  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <img
              onClick={()=>navigate('/')} //open home page
              src={assets.logo_tb2}
              alt=""
              className="absolute left-5 sm:left-20 w-49 sm:w-60 top-5 cursor-pointer"
            />
{/*Enter email id*/}

    {!isEmailSent &&   

      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your registered Email ID</p>
        
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
          <input type="email" placeholder='Email ID' className='bg-transparent outline-none text-white'
          value={email} onChange={e=> setEmail(e.target.value)} required/>
        </div>

        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>

      </form>
    }

{/*otp input form*/}

{!isOtpSubmitted && isEmailSent &&

<form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your Email ID</p>
      
      <div className='flex justify-between mb-8' onPaste={handlePaste}>
        {Array(6).fill(0).map((_, index)=>(
          <input type='text' maxLength='1' key={index} required
          className='w-12 h-12 bg-[#333A5C] text-white text-center text-l rounded-md'
          ref={e => inputRefs.current[index] = e}
          onInput={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          />

        ))}

      </div>

      <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>
      
      </form>
  }
      {/*Enter new password*/}

  {isOtpSubmitted && isEmailSent && 

      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>
        
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.lock_icon} alt="" className='w-3 h-3'/>
          <input type="password" placeholder='New Password' className='bg-transparent outline-none text-white'
          value={newPassword} onChange={e=> setNewPassword(e.target.value)} required/>
        </div>

        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>

      </form>
  }
      </div>
    </div>
  )
}

export default ResetPassword
