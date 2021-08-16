import React, { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [users, setUsers] = useState({
    fname:"",
    lname:"",
    email:"",
    phone:"",
    message:""
  })

  let name, value;

  const getUserData=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setUsers({...users,[name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault()
    const {fname, lname, email, phone, message} = users;

    if(!fname || !lname || !email || !phone || !message){
      toast.error('🦄 Please fill the form correctly!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else{
      const res = await fetch("https://fir-react-realtime-default-rtdb.firebaseio.com/reactform.json",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          fname,
          lname, 
          email,
          phone,
          message
        })
      })
  
      if(res){
        toast.success('🦄 Form successfully submiited!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }


    
  }

  return (
    <div class="big-container">
        <div class="container">
            <h2>Contact Form</h2>
            <div class="input-container">
                <input type="text" name="fname" value={users.fname} onChange={getUserData} placeholder="First Name" autocomplete="off"/>
                <input type="text" name="lname" value={users.lname} onChange={getUserData} placeholder="Last Name" autocomplete="off"/>
            </div>
            <div class="input-container">
                <input type="text" name="email" value={users.email} onChange={getUserData} placeholder="Email" autocomplete="off"/>
                <input type="number" name="phone" value={users.phone} onChange={getUserData} placeholder="Phone" autocomplete="off"/>
            </div>
            <textarea name="message" value={users.message} onChange={getUserData}  placeholder="Enter message..."></textarea>
            <button class="btn" onClick={submitForm} type="submit">Submit</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default App
