import React, { useState,useRef } from 'react'
import { useEffect } from 'react'
import { useQuery ,useMutation } from 'react-query'
import {postRegistration} from "./../../Api/Api"
//content 
import login_img from "./../../../assets/images/login/login_img.svg"
import login_img_samll from "./../../../assets/images/login/login_samll.svg"
import { SignupPage } from './styled';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SelectRole from '../Select your Role popup/SelectRole'
// import Ticket from './Ticket'
// import Subtract from "./../assets/images/login/login-bg.png"
// import Ticket2 from './Ticket2 '
// import Subtract from "./../assets/images/login/login form.jpg"
// import login_img from "./../assets/images/login/login form.jpg"

type SignupPropsType = {
    showSigninForm: () => void;
  };
  
type dataType={
    name: string;
    emailid: string;
    password: string;
    number: string;
    account: number | undefined;
}




export default function Signup  ({showSigninForm}: SignupPropsType) {
    
    const navigate=useNavigate()

    const [account,setAccount]=useState<number>()
    const [selectRole,setSelectRole]=useState(false)
    const [formName,setFormName]=useState("")
    const [formEmail,setFormEmail]=useState("")
    const [formMobile,setFormMobile]=useState("")
    const [formPassword,setFormPassword]=useState("")
    

    const name=useRef<any>()
    const password=useRef<any>()
    const email=useRef<any>()
    const number=useRef<any>()



    const userData={
        name:formName,
        emailid:formEmail,
        password:formPassword,
        number:formMobile,
        account:account
    }

      
    const {mutate,data } = useMutation(["tyu",userData] ,postRegistration,{
        onSuccess:(response)=>{
            showSigninForm()
            
            if(response.user.account==0) return navigate("/organizer/dashboard")
            return navigate("/director/festival")
        }
    })

    const requestUserRegistration=()=>{
        name.current.setAttribute("required",true)
        password.current.setAttribute("required",true)
        email.current.setAttribute("required" ,true)
        number.current.setAttribute("required" ,true)
        if(account==null) return  setSelectRole(true)
        mutate( userData);
    }

    const handleToggleSelectRole=()=>{
        setSelectRole(false)
      }


 

 

  return (
 <>
    <SignupPage>
        <div>
            <div className="left">
                     <img className="login_img" src={login_img_samll}></img>
                     <h1>Log In </h1>
                     <p>Login and Submit Thousand of world Film Festivals</p>
                <div>
                    <div className="foam"> 
                        <div className="title">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="foam_field">
                            <div className="full first_half">
                                <label htmlFor="name" >Name</label>
                                <input ref={name} id="name" placeholder="Enter Name" value={formName} onChange={(e)=>{setFormName(e.target.value)}}></input>
                                <p style={{ display: "none"}}>Enter Your Name</p>
                            </div>
                            <div className="full first_half">
                                <label htmlFor="email" > E-mail Address</label>
                                <input ref={email} id="email" type="email" placeholder="Enter  Email id " value={formEmail} onChange={(e)=>{setFormEmail(e.target.value)}}></input>
                                <p style={{ display: "none"}}>Enter Your Email</p>
                            </div>
                            <div className="full">
                                <label htmlFor="password" >Password</label>
                                <input ref={password} id="password" placeholder="Enter  Password " value={formPassword} onChange={(e)=>{setFormPassword(e.target.value)}}></input>
                                <p style={{ display: "none"}}>Enter Your Password</p>
                            </div>
                            <div className="full">
                                <label htmlFor="WhatsApp" >Whatsapp Number</label>
                                <input ref={number} id="WhatsApp" type="number" placeholder="Enter Whatsapp Number " value={formMobile} onChange={(e)=>{setFormMobile(e.target.value)}}></input>
                                <p style={{ display: "none"}}>Enter Your Number</p>
                            </div>
                            <div className="full">
                                <label htmlFor="password" >Select Role</label>
                                <div className="role">
                                    <button className={` ${account==0 ? "active_card" : ""}`} onClick={() => {setAccount(0)}}>Create Festival</button>
                                    <button className={` ${account==1 ? "active_card" : ""}`} onClick={() => {setAccount(1)}}>Submit Film</button>
                                </div>
                            </div>

                            <div className="full submit_btn">
                                <h5>Already have an account Login Here..</h5>
                                <button className="submit" onClick={()=>requestUserRegistration()}>REGISTER</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="button button2" onClick={()=> showSigninForm()}>x</button>

            </div>
            <div className="right">
                <img src={login_img}></img>
                <button onClick={()=> showSigninForm()}>x</button>

            </div>
        </div>

        {selectRole && <SelectRole  toggleSelectRole={handleToggleSelectRole} />}

    </SignupPage>
 
 
 </>
  )
}



