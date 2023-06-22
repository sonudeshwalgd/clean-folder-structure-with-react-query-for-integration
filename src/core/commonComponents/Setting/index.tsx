import React,{ useState ,useEffect ,useRef} from 'react'
import styled from 'styled-components'
import { useNavigate ,useLocation} from 'react-router-dom'
//content 
import review1 from "./../../../assets/images/organizer dashboard/review1.jpeg"
import girl from "../../../assets/images/organizer dashboard/girl.svg"
import icon1 from "../../../assets/images/organizer dashboard/1.svg"
import ChangePassword from '../ChangePassword/ChangePasswordPopup'
import { QueryClient, useMutation, useQuery } from 'react-query'
import { getDirectorProfile, getDirectorTransaction, getOrganizerTransaction, patchDirectorUpdateProfile, patchDirectorUpdateProfilePicture, patchOrganizerPayout, patchOrganizerUpdateProfile } from '../../Api/Api'
import Result from '../Request result popup/Result'
import SelectAndOptionHTMLTag from '../SelectAndOptionHTMLTag/SelectOptions'
import { queryClient } from '../../..'
import LoadingPage from '../LoadingFallback/Loading'

type OrganizerSettingPropsType = {
    isPayoutVisible:boolean;
}

export default function OrganizerSetting({isPayoutVisible = false }:OrganizerSettingPropsType) {



    const [account ,setAccount]=useState(true)
    const [transaction ,setTransaction]=useState(false)
    const [payout ,setPayout]=useState(false)
    const [showChangePassword,setShowChangePassword]=useState(false)

    const [showResponseResultSuccess, setShowResponseResultSuccess] = useState(false);

    const use=(tab: React.MouseEvent<HTMLDivElement | MouseEvent> | any)=>{
        setAccount(false)
        setTransaction(false)
        setPayout(false)
        tab(true)
    }
    const [activeCard ,setActiveCard ]=useState("SupportCard")
    const renderSelector = (card:string) => {
      setActiveCard(card)
    };
    const handleToggleChnagePassword=()=>{
        setShowChangePassword(false)
    }
    const handleToggleResultSuccessPopup=()=>{
        setShowResponseResultSuccess(false)
      }



    //get and update profile
    const [resultData,setResultData]=useState<any>()

    const {data:profile,refetch:refetchProfile ,isFetching:userProfile}=useQuery("directorProfile",getDirectorProfile,{
        onSuccess:(res)=>{
            // setIsResultVisibleTwo(true)
            // setResultData(res)
        }
        ,onError:(err:any)=>{
            // setResultData(err.response.data)
            // setIsResultVisibleTwo(true)
        }
    })
    
    const {mutate:organizerProfileUpdate ,isLoading:userLoading }=useMutation(["organizerProfileUpdate"],patchDirectorUpdateProfilePicture,{
        onSuccess:(res)=>{
            setIsResultVisibleTwo(true)
            setResultData(res)
            refetchProfile()
        }
        ,onError:(err:any)=>{
            setResultData(err.response.data)
            setIsResultVisibleTwo(true)
        }
    })
    
    const {mutate:directorUpdate ,data:dataDirectorUpdate,isLoading:userUpdateLoading}=useMutation(["organizerProfileUpdate"],patchDirectorUpdateProfile,{
        onSuccess:(res)=>{
            setResultData(res)
            setIsResultVisibleTwo(true)
            refetchProfile()
        }
        ,onError:(err:any)=>{
            setResultData(err.response.data)
            setIsResultVisibleTwo(true)
        }
    })
    

    const updateProfileHandler=(e:any)=>{
       const  form=new FormData()
       form.append("img",e.target.files[0])
       organizerProfileUpdate(form)
    }



//update profile 
    const name=useRef<any>()
    const mobileNo=useRef<any>()
    
    const {mutate:organizerUpdate ,data ,isLoading:organizerUpdateLoading}=useMutation(["organizerProfileUpdate"],patchOrganizerUpdateProfile,{
        onSuccess:(res)=>{
            setIsResultVisibleTwo(true)
            refetchProfile()
            setResultData(res)
        }
        ,onError:(err:any)=>{
            setResultData(err.response.data)
            setIsResultVisibleTwo(true)
        }
    })

    const updateProfile=()=>{
        mobileNo.current.setAttribute("required",true)
        name.current.setAttribute("required",true)

        const userData={
            mobileno:mobileNo.current.value,
            name:name.current.value
        }


        if(mobileNo.current.value.length>0 && name.current.value.length>0 && localStorage.getItem("userType")=="0") return organizerUpdate(userData)
        if(mobileNo.current.value.length>0 && name.current.value.length>0 && localStorage.getItem("userType")=="1") return directorUpdate(userData)
    }


//payout section
    const [ payoutMethod,setPayoutMethod]=React.useState<any>() 
    const Bank =useRef<any>()
    const IFSC =useRef<any>()
    const Branch =useRef<any>()
    const Holder =useRef<any>()
    const Number=useRef<any>()
    const NumberAgain=useRef<any>()
    const payoutLink=useRef<any>()
    const Gpay=useRef<any>()
    const Upi=useRef<any>()

    const {mutate:payoutMutate ,data:payoutData,isLoading:patchPayoutLoading}=useMutation(["organizerPayout"],patchOrganizerPayout,{
        onSuccess:(res)=>{
            setIsResultVisibleTwo(true)
            setResultData(res)
        }
        ,onError:(err:any)=>{
            setResultData(err.response.data)
            setIsResultVisibleTwo(true)
        }
    })

    const updatePaymentMethod=()=>{
        const dataPayment={
            accountno: Number?.current?.value,
            bankname: Bank?.current?.value,
            branchname: Branch?.current?.value,
            holdername: Holder?.current?.value,
            ifsccode: IFSC?.current?.value,
            payouttype: payoutMethod,
            paypallink: payoutLink?.current?.value || Gpay?.current?.value ||Upi?.current?.value || "",
            userid: localStorage.getItem("userId"),
        }
        payoutMutate(dataPayment)
    }


//transaction 

    const startDate=useRef<any>()
    const endDate=useRef<any>()

const {data:transactionHistoryOrganizer,mutate:transactionMutate ,isLoading:transactionLoading}=useMutation("getOrganizerTransaction",getOrganizerTransaction,{
    onSuccess:(res)=>{
        setIsResultVisibleTwo(true)
        setResultData(res)
    }
    ,onError:(err:any)=>{
        setResultData(err.response.data)
        setIsResultVisibleTwo(true)
    }
})
// const {data:transactionHistoryDirector}=useQuery("getOrganizerTransaction",getDirectorTransaction,{
//     enabled:Boolean(localStorage.getItem("userType")=="1"),
//     onSuccess:(res)=>{
//         console.log("dires")
//         console.log(res);
//     },
//     onError:(err)=>{
//         console.log(err);
//     }
// })

const transactionRequestHandler=()=>{
    const payload={
        from:startDate.current.value,
        to:"",
        festivalid:localStorage.getItem("festivalId")
    }
    console.log(startDate.current.value);
    
    transactionMutate(payload)
    // getDirectorTransaction(payload)
}


const [isResultVisibleTwo,setIsResultVisibleTwo]=useState<boolean>(false)
const resultVisibilityTwoFalseHandler=()=>{
    setIsResultVisibleTwo(false)
}

  return (
    <>

    {isResultVisibleTwo && <Result state={resultData?.message?"Success":"Error"}  description={resultData?.message?resultData?.message:"Something Went Wrong"} showResult={resultVisibilityTwoFalseHandler}/>}

    {userProfile && <LoadingPage/>}
    {userLoading && <LoadingPage/>}
    {userUpdateLoading && <LoadingPage/>}
    {transactionLoading && <LoadingPage/>}
    {patchPayoutLoading && <LoadingPage/>}
    {organizerUpdateLoading && <LoadingPage/>}
    {userProfile && <LoadingPage/>}



    {/* {showResponseResultSuccess && <Result state="Success" description={data?.message} showResult={handleToggleResultSuccessPopup} />} */}
    {showChangePassword && <ChangePassword showChnagePassword={handleToggleChnagePassword}></ChangePassword>}
    <SettingWrapper>
            <div className="selector_tab">
                <div className="tab">
                    <button className={` ${activeCard=='SupportCard' ? "active_button" : ""}`} onClick={()=>{use(setAccount);renderSelector("Account")}}><h2>Account</h2></button>
                    {isPayoutVisible && <button className={` ${activeCard=='Payout' ? "active_button" : ""}`}  onClick={()=>{use(setPayout);renderSelector("Payout")}}><h2>Payout</h2></button>}
                    <button className={` ${activeCard=='Transactions' ? "active_button" : ""}`}  onClick={()=>{use(setTransaction);renderSelector("Transactions")}}><h2>Transactions</h2></button>
                </div>
            </div>
            {/*Tabs of content  */}
       {account && 
        <div className ="account">
            <div className="content">
                <h1>My Account</h1>
            </div>
            <div className="body">
                <div className="left">
                <Profile>
                    <div>
                        <img src={"http://3.89.138.204:3000/uploads/"+profile?.imgurl}></img>
                        <h1 style={{visibility:"hidden"}}>Ajay</h1>
                        <label htmlFor="changeProfile" style={{background:"#dae8fe",color:"var(--theme)"}}><i className="ri-equalizer-fill"></i>Change picture</label>
                        <input onChange={(e)=>updateProfileHandler(e)} id="changeProfile" type="file"/>
                    </div>
                </Profile>
              

                </div>
                <div className="right">
                <div className="foam_field">
                    <p className="title">Details</p>
                            <div className="half first_half">
                                <label >Name</label>
                                <input ref={name} id="name" placeholder="Enter your name "></input>
                                <p style={{ display: "none"}}>Enter Your Name</p>

                            </div>
                            <div className="half first_half">
                                <label >Email Id</label>
                                <input id="email" placeholder="Enter  Email id "></input>
                            </div>

                            <div className="half first_half">
                                <label >Mobile No</label>
                                <input ref={mobileNo} id="mobile" placeholder="Enter  Mobile No "></input>
                                <p style={{ display: "none"}}>Enter Mobile No</p>
                            </div>
                   
                            <div className="full">
                                <button style={{padding: "8px 22px ",background:"#f2d01b"}} className="button_blue change-Password " onClick={()=>setShowChangePassword(true)}>Change Password</button>
                            </div>
                            <div className="full">
                                <button onClick={()=>{updateProfile()}} style={{marginLeft:"auto"}} className="button_blue">Save</button>
                            </div>
                        </div>
                    

                </div>


            </div>
      
        </div>
        }
       {payout && 
        <div className ="account">
        
            <div className="content">
                <h1>Payout Information </h1>
            </div>
            <div className="body">

                <div className="right">
                <div className="important">
                
          
                  <p><img src={icon1}></img>It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in
                  <br></br> which the Latin words are repeated.It is certainly the most famous placeholder text even if there are different versions distinguishable<br></br> from the order in which the Latin<br></br> words are repeated.It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated.</p>

                 </div>
                <div className="foam_field less_width">
                            <div className="full df">
                                <label htmlFor="name" >Payout Type</label>
                                <SelectAndOptionHTMLTag option={["None", "Paypal","Gpay","UPI","Bank Account"]}  prop={setPayoutMethod}/>
                            </div>
                            {payoutMethod=="Paypal"&& <div className="full df">
                                <label htmlFor="payoutLink" >Payout Link</label>
                                <input ref={payoutLink} id="payoutLink" placeholder=" Enter Paypal Link "></input>
                            </div>}

                            {payoutMethod=="Gpay"&& <div className="full df">
                                <label htmlFor="payoutLink" >Gpay Number</label>
                                <input ref={Gpay} id="payoutLink" placeholder=" Enter Gpay Number "></input>
                            </div>}

                            {payoutMethod=="UPI"&& <div className="full df">
                                <label htmlFor="payoutLink" >Paypal Link</label>
                                <input ref={Upi} id="payoutLink" placeholder=" Enter Paypal Link "></input>
                            </div>}

                            {payoutMethod=="Bank Account"&& <div className="full df listDown">
                                <h5 style={{color:"red",padding:"6px 0"}}> Note: This option is  avaliable for only for Indian Nationalized banks </h5>
                                <div className="label-input">
                                    <label htmlFor="payoutLink" >Bank Name</label>
                                    <input ref={Bank} id="payoutLink" placeholder=" Enter Bank Name "></input>
                                </div>
                                <div className="label-input">
                                    <label htmlFor="payoutLink" >IFSC Code</label>
                                    <input ref={IFSC} id="payoutLink" placeholder=" Enter IFSC Code "></input>
                                </div>
                                <div className="label-input">
                                    <label htmlFor="payoutLink" >Branch Name</label>
                                    <input ref={Branch} id="payoutLink" placeholder=" Enter Branch Name "></input>
                                </div>
                                <div className="label-input">
                                    <label htmlFor="payoutLink" >Account Holder Name</label>
                                    <input ref={Holder} id="payoutLink" placeholder=" Enter Account Holder Name "></input>
                                </div>
                                <div className="label-input">
                                    <label htmlFor="payoutLink" >Account Number</label>
                                    <input ref={Number} id="payoutLink" placeholder=" Enter Account Number "></input>
                                </div>
                                <div className="label-input">
                                    <label htmlFor="payoutLink" >Account Number Again</label>
                                    <input ref={NumberAgain} id="payoutLink" placeholder=" Enter Account Number Again "></input>
                                </div>
                            </div>}

                            <div className="full">
                                <button onClick={()=>{updatePaymentMethod()}} style={{margin:"auto"}} className="button_blue">Save</button>
                            </div>
                        </div>
                    

                </div>


            </div>
      
        </div>
        }

        {transaction && 
        <div className ="account">
        
            <div className="content">
                <div>
                    <p>Season</p>
                    <select>
                        <option>Current season</option>
                    </select>

                </div>
            </div>
            <div className="body">

                <div className="right">
                <div className="foam_field ">
                            <div className="half first_half smallest">
                                <label htmlFor="name" >From</label>
                                <input ref={startDate} onChange={transactionRequestHandler} className="noradius" id="name" type="date" ></input>
                            </div>
                            <div className="half first_half smallest">
                                <label htmlFor="email" >To</label>
                                <input ref={endDate} onChange={transactionRequestHandler} className="noradius" id="email" type="date" ></input>
                            </div>
                  
                            <div className="half first_half smallest_button">
                                <button style={{marginLeft:"auto" }} className="button_blue">Export</button>
                            </div>
                        </div>
                    

                </div>
             

            </div>
            <div className="transactions">
                <img src={girl}></img>
                <h1>No Transactions Found</h1>

                <div className="sub-found">
                                <table>
                                       <thead>
                                        <tr>
                                            <th style={{width:"10%",paddingLeft:"10px"}}>Order Id</th>
                                            <th style={{width:"55%"}}>Description</th>
                                            <th style={{width:"15%"}}>Date</th>
                                            <th style={{width:"15%"}}>Transaction Typepe</th>
                                            <th style={{width:"5%"}}>Total</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td data-attr="Order Id"  >ProjectX</td>
                                                <td data-attr="Description" >MUI Short Film Festivals</td>
                                                <td data-attr="Date" >24 August 2021</td>
                                                <td data-attr="Transaction Type" >Credit</td>
                                                <td data-attr="Total" >₹ 4860</td>
                                            </tr>
                                            <tr>
                                                <td data-attr="Order Id"  >ProjectX</td>
                                                <td data-attr="Description" >MUI Short Film Festivals</td>
                                                <td data-attr="Date" >24 August 2021</td>
                                                <td data-attr="Transaction Type" >Credit</td>
                                                <td data-attr="Total" >₹ 4860</td>
                                            </tr>
                                        </tbody> 



                                </table>

                            </div>

            </div>
      
        </div>
        }


    </SettingWrapper>
    
    
    
    </>
  )
}




const SettingWrapper =styled.div`
width: 100vw;
background-color: var(--background);
padding-bottom: 20px;
h1{
    font-size: 20px;
    color: #111;
    font-weight: 700;
    padding: 4px 0;

}
h2{
    font-size: 14px;
    color: #111;
    padding: 4px 0;
    font-weight: 600;

}
p{
    font-size: 14px;
    padding: 4px 0;
    color: #111;
    font-weight: 400;
}
.p4{
    padding: 4px 0;
}
.p5{
    padding: 5px 0;
}
.p8{
    padding: 8px 0;
}
.mb5{
    margin-bottom: 5px;
}
.mb15{
    margin-bottom: 15px !important;
}
.mb20{
    margin-bottom: 20px !important;
}
.green{
    color: #2DB482;
}
.light_green{
    background-color: #DAFEF1 !important;
    color: #2DB482 !important;


}
.title{
    width: 100%;
    padding-bottom: 20px;
    font-size: 16px;
}
.button_blue{
        padding: 8px 62px ;
        background-color: var(--theme);
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        outline: none;
        border-radius: 5px;
        margin-bottom: 10px;
        margin-top: 10px;
        width: max-content;
}
.important{
        width: 100%;
        display: flex;
        background-color: #b9d6fb;
        padding: 15px;
        margin-bottom: 40px;
        border-radius: 10px;

        &>p{
            display: flex;
            align-items: center;
            color: var(--theme);

            &>img{
            height: 30px;
            width: 30px;
            float: left;
            display: block;
            color: var(--theme);
            margin-right:20px ;

        }
        }

    }
.smallest{
    width: 25% !important;
    &>label{
        color: #333;
        font-weight: 600 !important ;
    }

}
.smallest_button{
    width: 50% !important; 
    &>input{
        border-radius: 0px !important;
    }
}
.noradius{
    border-radius: 0 !important;
}


&>.selector_tab{
    max-width: var(--maxwidth2);
    padding: 0;
    background-color: inherit;
    box-shadow: none;
    top: 0;
    /* margin-top: 5px; */
    z-index: 999;
    position: sticky ;
    top: 118px;

    @media screen and (max-width:1150px) {
        position: fixed;

    }
    &>.tab{
        box-shadow: 0 -5px 5px 2px rgba(0,0,0,.1);
        display: flex;
        gap: 10px;
        padding: 10px ;
        width: max-content;
        background-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-left: 0;

        &>button{
            padding: 5px 22px;
            background-color: #ddd;
            border: none;
            border-radius: 10px;
            outline: none;
            &>h2{
                pointer-events: none;
                color: inherit;
            }
            
            
        }
    }
}
.transactions{
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 350px;

    &>img{
        height: 130px;
    }
    &>.sub-found{
            width: 100%;
            margin-top: 20px;

            &>table{
                border-collapse: collapse;
              
                position: relative;
                width: 100%;
                @media screen and (max-width:750px){
                    thead{
                        display: none;
                    }
                    .tohide{
                        display: none;
                    }
                    tbody{
                        display: flex;
                        flex-direction: column;
                        tr{
                            width: 90% !important;

                            margin: 10px auto;
                            padding: 10px;
                            border-radius: 10px;
                            box-shadow:0 0 5px 2px rgba(0,0,0,.2) ;
                        }
                        td{
                            height: max-content !important;
                            padding: 10px;
                            width: 100%;
                            display: block;
                            ::before{
                                content: attr(data-attr);
                                padding: 5px 0;
                                color: var(--theme);
                                display: block;
                                font-weight: 600;

                            }
                        }
                    }

                }
                &>thead{
                    &>tr{
                        background-color: #E9E9E9;
                        width: 100%;
                        &>th{
                            height: 50px;
                            color: #111;
                            font-size: 14px;
                            font-weight: 600;
                            text-align: left;
                        }
                    }
                }
                &>tbody{
                    &>tr{
                        width: 100%;
                        :hover td{
                            background-color: #DAE8FE;
                            color: var(--theme) !important;
                        }
                        &>td{
                            height: 50px;
                            color: #333;
                            font-size: 14px;
                            font-weight: 400;

                        }
                        &>td:nth-child(1){
                            padding-left: 10px;
                        }
                    }
                }
            }

        }

}
&>div{
    width: 100vw;
    max-width: var(--maxwidth2);
    margin: auto;
    background-color: white;
    padding: 0 20px;
    border-radius: 10px;
    box-shadow: 0 5px 5px 2px rgba(0,0,0,.1);
    padding-bottom: 10px;
    border-top-left-radius: 0;



    &>.content{
        padding: 20px 0px 10px 0px;
        max-width: var(--maxwidth2);
        margin: auto;
        /* display: none; */
        @media screen and (max-width:1150px){
            padding-top: 56px;
        }
        &>div{
            display: flex;
            gap: 20px;
            align-items: center;
            padding: 0 10px;
            &>input{
                transform: scale(1.3);
            }
        }
        &>div{
            display: block;
            width: max-content;
            margin-left: auto;

            &>p{
                font-size: 14px;
                padding: 5px 0;
                font-weight: 500;
                
            }
            &>select{
                padding: 10px 80px 10px 10px;
                border-radius: 10px;
                font-size: 16px;
                background-color: inherit;
            }
        }
    }

    &>.body{
        display: flex;
        width: 100%;
        position: relative;
        gap: 20px;
        padding-top: 20px;
        @media screen and (max-width:666px) {
            flex-direction: column;
            .half{
                width: 100% !important;
            }
            .change-Password{
                width: 100% !important;
            }
        }
        @media screen and (max-width:364px) {
            .first_half{
                width: 100% !important;
            }
        }
        &>.left{
            flex: 1.5;
            position: relative;
        }
        &>.right{
            flex: 8;
            position: relative;
            &>.foam_field{
                    display: flex;
                    position: relative;
                    flex-wrap: wrap;
                    @media screen and (max-width:500px){
                        .smallest_button{
                            width: 100% !important; 
                            align-items: center;
                        }
                        .smallest{
                            width:50%  !important;  

                        }
                    }

                        &>.full,&>.half,.label-input{
                            display: flex;
                            flex-direction: column;
                            width: 100%;

                            label{
                                font-size: 14px;
                                color: #111;
                                font-weight: 500;
                                padding-bottom: 5px;
                            }
                            input{
                                width: 100%;
                                margin-bottom: 12px;
                                padding: 14px 8px ;
                                border-radius: 10px;
                                border: 1px solid #999;
                                margin-bottom: 20px;
                                ::placeholder{
                                    color: #333;
                                    font-size: 14px;
                                    font-weight: 500;

                                }
                                &:focus{
                                    outline: 2px solid var(--theme);
                                    border: none;
                                    
                                    
                                }

                            }
                            textarea{
                                width: 100%;
                                margin-bottom: 12px;
                                padding: 5px 10px ;
                                border-radius: 10px;
                                border: 1px solid #999;
                                min-height: 140px;
                                ::placeholder{
                                    color: #333;
                                    font-size: 14px;
                                    font-weight: 500;
                                }
                                &:focus{
                                    outline: 2px solid var(--theme);
                                    border: none;
                                    
                                    
                                }

                            }
                                
                            &>.submit{
                                    width: max-content;
                                    align-self: center;
                                    display: flex;
                                    align-items: center;
                                    padding: 20px 25px;
                                    background-color: var(--theme);
                                    height: 36px;
                                    font-size: 14px;
                                    line-height: 24px;
                                    color: var(--heading1);
                                    outline: none;
                                    border: none;
                                    font-weight: 600;
                                    border-radius: 5px;
                                    color: white;
                                    text-decoration: none;
                                }
                        }

                        &>.half{
                            display: flex;
                            flex-direction: column;
                            width: 50%;
                            


                        }
                        &>.first_half{
                            padding-right: 10px;
                        }
                }
                &>.less_width{
                width: 60% !important;
                min-width: 300px;
                margin: auto;
                flex-direction: column;
                .df{
                    display: flex !important;
                    gap: 20px;
                    flex-direction: row ;
                    &>label{
                        white-space: nowrap;
                        width: 120px;
                        text-align: right;
                        font-weight: 600;
                    }
                }
            }    
        }

    }





    &>.important{
        width: 100%;
        display: flex;
        background-color: #b9d6fb;
        padding: 15px;
        margin-bottom: 40px;
        border-radius: 10px;

        &>p{
            display: flex;
            align-items: center;
            color: var(--theme);

            &>img{
            height: 30px;
            width: 30px;
            float: left;
            display: block;
            color: var(--theme);
            margin-right:20px ;

        }
        }

    }

    &>.result{
        width: 100%;
        position: relative;
        &>div{
            border: 2px solid #999;
            margin-top: 5px;

            &>ul{
                &>li{
                    display: flex;
                    margin-bottom: 5px;
                    border-radius: 10px;
                    background-color: #eee;
                    padding: 8px 10px;
                    flex-wrap: wrap;
                    &>h2{
                        flex:1;
                        display: flex;
                        position: relative;
                        align-items: center;
                        pointer-events: none;
                        &>img{
                            height: 25px;
                            width: 25px;
                            object-fit: contain;
                            margin-right: 10px;

                        }

                    }
                    &>h2.last{
                        flex:1;
                        display: flex;
                        justify-content: space-between;
                        position: relative;
                        &>div{
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        }
                        img{
                            height: 15px;
                            width: 15px;
                            object-fit: contain;

                        }

                    }
                    .toopen{
                        pointer-events: all;
                        overflow: hidden;
                        width: 100%;
                        background-color: white;
                        height: 0;
                        overflow: hidden;
                        &>div{
                            margin-top: 10px;
                            &>.top{
                                margin: 10px;
                                border: 1px solid #999;
                                border-radius: 10px;
                                padding: 10px;
                                min-height: 120px;

                            }
                            &>.bottom{
                                margin: 10px;
                                border: 1px solid #777;
                                border-radius: 10px;
                                padding: 10px;
                                min-height: 140px;
                                display: flex;
                                &>img{
                                    height: 130px;
                                    width: 130px;
                                    object-fit: cover;

                                }
                                &>.content{
                                    display: flex;
                                    flex-direction: column;
                                    padding: 5px 20px ;
                                    gap: 15px;
                                    width: 100%;
                       
                                    &>div{
                                        &>div{
                                        display: flex;
                                        gap: 8px;
                                        align-items: center;
                                        img{
                                            height: 22px;
                                        }
                                        }
                                        &>.line{
                                            padding: 25px 10px;
                                            border-bottom: 1px solid var(--theme);
                                            width: 100%;
                                            flex: 1;
                                            font-size: 16px;

                                        }
                                    }
   


                                }
                            }
                            &>button{
                                padding: 8px 62px ;
                                background-color: var(--theme);
                                color: white;
                                font-weight: 600;
                                font-size: 16px;
                                border: none;
                                outline: none;
                                border-radius: 5px;
                                margin-left: 10px;
                                margin-bottom: 10px;
                            }

                        }
                    }
                }
                &>li:nth-child(1){
                    border-radius: 0;
                }
            }
        }
    }
    &>.newmail{
        &>button{
                                padding: 10px 26px ;
                                background-color: var(--theme);
                                color: white;
                                font-weight: 600;
                                font-size: 16px;
                                border: none;
                                outline: none;
                                border-radius: 5px;
                                margin-bottom: 10px;
                                display: flex;
                                align-items: center;
                                &>img{
                                    height: 18px;
                                    margin-right: 5px;
                                }
          }
          &>.content_email{
            display: flex;
            justify-content: center;
            flex-direction: column;
            &>img{
                height: 120px;
                margin-bottom: 15px;
                object-fit: contain;
                
            }
            &>h1{
                margin: auto;
            }
            &>p{
                margin: auto;

            }
            &>button{
                                padding: 8px 16px ;
                                background-color: var(--theme);
                                color: white;
                                font-weight: 600;
                                font-size: 16px;
                                border: none;
                                outline: none;
                                border-radius: 5px;
                                margin-bottom: 10px;
                                display: flex;
                                align-items: center;
                                margin: 10px auto;
                           
          }
            

          }
    }
    &>.top{
                                margin: 10px 0;
                                border: 1px solid #999;
                                border-radius: 10px;
                                padding: 10px;
                                min-height: 200px;
                                &>p{
                                    font-size: 16px;
                                    color: #333;
                                }

    }
    &>button{
                                padding: 8px 54px ;
                                background-color: var(--theme);
                                color: white;
                                font-weight: 600;
                                font-size: 16px;
                                border: none;
                                outline: none;
                                border-radius: 5px;
                                display: flex;
                                align-items: center;
                                margin: auto;
                       
          }
}
.listDown{
    flex-direction: column !important;
    gap: 0 ;
    .label-input{
        display: flex;
        gap: 10px;
        flex-direction: row !important;;
        label{
            width: 150px;
        }
    }
}
` 
const Profile=styled.div`
border-radius: 10px;
background-color: white;
margin-bottom: 20px;
width: 100%;
position: relative;

&>div{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding: 15px 20px ; */
    &>img{
        width: 18vw;
        height:18vw;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #aaa;
        min-width: 250px;
        min-height: 250px;

    }
    &>h1{
        color: #111;
        font-size: 20px;
        font-weight: 500;
        padding: 15px;
    }
    &>p{
        font-size: 14px;
        font-weight: 400;
        padding-bottom: 15px;
    }
    &>label{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #111;
        font-weight: 600;
        align-items: center;
        padding: 8px 0;
        font-size: 16px;
        border: none;
        outline: none;
        background-color: #ccc;
        border-radius: 5px;
        white-space: nowrap;
        padding-right: 5px;
        &>i{
            padding: 0 10px;
            font-size: 25px;
            @media screen and (max-width:600px) {
                display: none;
            }
        }
    }
    input{
        display: none;
    }
    &>button:first-of-type{
        margin-bottom: 10px;
    }
}




`



// this section is having range calendar with some css and incomplete process of material ui calendar 




// import React,{ useState ,useEffect ,useRef} from 'react'
// import styled from 'styled-components'
// import { useNavigate ,useLocation} from 'react-router-dom'
// //content 
// import review1 from "./../../../assets/images/organizer dashboard/review1.jpeg"
// import girl from "../../../assets/images/organizer dashboard/girl.svg"
// import icon1 from "../../../assets/images/organizer dashboard/1.svg"
// import ChangePassword from '../ChangePassword/ChangePasswordPopup'
// import { QueryClient, useMutation, useQuery } from 'react-query'
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import { getDirectorProfile, getDirectorTransaction, getOrganizerTransaction, patchDirectorUpdateProfile, patchDirectorUpdateProfilePicture, patchOrganizerPayout, patchOrganizerUpdateProfile } from '../../Api/Api'
// import Result from '../Request result popup/Result'
// import SelectAndOptionHTMLTag from '../SelectAndOptionHTMLTag/SelectOptions'
// import { queryClient } from '../../..'

// type OrganizerSettingPropsType = {
//     isPayoutVisible:boolean;
// }

// export default function OrganizerSetting({isPayoutVisible = false }:OrganizerSettingPropsType) {



//     const [account ,setAccount]=useState(true)
//     const [transaction ,setTransaction]=useState(false)
//     const [payout ,setPayout]=useState(false)
//     const [showChangePassword,setShowChangePassword]=useState(false)

//     const [showResponseResultSuccess, setShowResponseResultSuccess] = useState(false);

    


//     const use=(tab: React.MouseEvent<HTMLDivElement | MouseEvent> | any)=>{
//         setAccount(false)
//         setTransaction(false)
//         setPayout(false)
//         tab(true)
//     }
//     const [activeCard ,setActiveCard ]=useState("SupportCard")
//     const renderSelector = (card:string) => {
//       setActiveCard(card)
//     };
//     const handleToggleChnagePassword=()=>{
//         setShowChangePassword(false)
//     }
//     const handleToggleResultSuccessPopup=()=>{
//         setShowResponseResultSuccess(false)
//       }



//     //get and update profile

//     const {data:profile,refetch:refetchProfile}=useQuery("directorProfile",getDirectorProfile,{
//         onSuccess:(res)=>{
//         },
//         onError:(err)=>{
//             console.log(err);
//         }
//     })

//     const {mutate:organizerProfileUpdate }=useMutation(["organizerProfileUpdate"],patchDirectorUpdateProfilePicture,{
//         onSuccess:(res)=>{
//             setShowResponseResultSuccess(true)
//         },
//         onError:(err)=>{
//             console.log(err);
//         }
//     })
    

//     const updateProfileHandler=(e:any)=>{
//        const  form=new FormData()
//        form.append("img",e.target.files[0])
//        organizerProfileUpdate(form)
//     }



// //update profile 
//     const name=useRef<any>()
//     const mobileNo=useRef<any>()



//     const {mutate:organizerUpdate ,data}=useMutation(["organizerProfileUpdate"],patchOrganizerUpdateProfile,{
//         onSuccess:(res)=>{
//             setShowResponseResultSuccess(true)
//             refetchProfile()
//         },
//         onError:(err)=>{
//             console.log(err);
//         }
//     })
//     const {mutate:directorUpdate ,data:dataDirectorUpdate}=useMutation(["organizerProfileUpdate"],patchDirectorUpdateProfile,{
//         onSuccess:(res)=>{
//             setShowResponseResultSuccess(true)
//             refetchProfile()
//         },
//         onError:(err)=>{
//             console.log(err);
//         }
//     })
//     const updateProfile=()=>{
//         mobileNo.current.setAttribute("required",true)
//         name.current.setAttribute("required",true)

//         const userData={
//             mobileno:mobileNo.current.value,
//             name:name.current.value
//         }

//         if(localStorage.getItem("userType")=="0") return organizerUpdate(userData)
//         return directorUpdate(userData)
//     }


// //payout section
//     const [ payoutMethod,setPayoutMethod]=React.useState<any>() 
//     const Bank =useRef<any>()
//     const IFSC =useRef<any>()
//     const Branch =useRef<any>()
//     const Holder =useRef<any>()
//     const Number=useRef<any>()
//     const NumberAgain=useRef<any>()
//     const payoutLink=useRef<any>()
//     const Gpay=useRef<any>()
//     const Upi=useRef<any>()

//     const {mutate:payoutMutate ,data:payoutData}=useMutation(["organizerPayout"],patchOrganizerPayout,{
//         onSuccess:(res)=>{
//             console.log(res);
//             // setShowResponseResultSuccess(true)
//         },
//         onError:(err)=>{
//             console.log(err);
//         }
//     })

//     const updatePaymentMethod=()=>{
//         const dataPayment={
//             accountno: Number?.current?.value,
//             bankname: Bank?.current?.value,
//             branchname: Branch?.current?.value,
//             holdername: Holder?.current?.value,
//             ifsccode: IFSC?.current?.value,
//             payouttype: payoutMethod,
//             paypallink: payoutLink?.current?.value || Gpay?.current?.value ||Upi?.current?.value || "",
//             userid: localStorage.getItem("userId"),
//         }
//         payoutMutate(dataPayment)
//     }


// //transaction 

// const [startDate,setStartDate]=useState<any>()
// const [endDate,setEndDate]=useState<any>()

// const {data:transactionHistoryOrganizer,mutate:transactionMutate}=useMutation("getOrganizerTransaction",getOrganizerTransaction,{
    
//     onSuccess:(res)=>{
//         console.log(res);
//         console.log("orga");
//     },
//     onError:(err)=>{
//         console.log(err);
//     }
// })
// const {data:transactionHistoryDirector}=useQuery("getOrganizerTransaction",getDirectorTransaction,{
//     enabled:Boolean(localStorage.getItem("userType")=="1"),
//     onSuccess:(res)=>{
//         console.log("dires")
//         console.log(res);
//     },
//     onError:(err)=>{
//         console.log(err);
//     }
// })
// console.log("object");
// console.log(queryClient.getQueryData<any>("getOrganizerTransaction"))


//   return (
//     <>
//     {showResponseResultSuccess && <Result state="Success" description={data?.message} showResult={handleToggleResultSuccessPopup} />}
//     {showChangePassword && <ChangePassword showChnagePassword={handleToggleChnagePassword}></ChangePassword>}
//     <SettingWrapper>
//             <div className="selector_tab">
//                 <div className="tab">
//                     <button className={` ${activeCard=='SupportCard' ? "active_button" : ""}`} onClick={()=>{use(setAccount);renderSelector("Account")}}><h2>Account</h2></button>
//                     {isPayoutVisible && <button className={` ${activeCard=='Payout' ? "active_button" : ""}`}  onClick={()=>{use(setPayout);renderSelector("Payout")}}><h2>Payout</h2></button>}
//                     <button className={` ${activeCard=='Transactions' ? "active_button" : ""}`}  onClick={()=>{use(setTransaction);renderSelector("Transactions")}}><h2>Transactions</h2></button>
//                 </div>
//             </div>
//             {/*Tabs of content  */}
//        {account && 
//         <div className ="account">
//             <div className="content">
//                 <h1>My Account</h1>
//             </div>
//             <div className="body">
//                 <div className="left">
//                 <Profile>
//                     <div>
//                         <img src={"http://3.89.138.204:3000/uploads/"+profile?.imgurl}></img>
//                         <h1 style={{visibility:"hidden"}}>Ajay</h1>
//                         <label htmlFor="changeProfile" style={{background:"#dae8fe",color:"var(--theme)"}}><i className="ri-equalizer-fill"></i>Change picture</label>
//                         <input onChange={(e)=>updateProfileHandler(e)} id="changeProfile" type="file"/>
//                     </div>
//                 </Profile>
              

//                 </div>
//                 <div className="right">
//                 <div className="foam_field">
//                     <p className="title">Details</p>
//                             <div className="half first_half">
//                                 <label >Name</label>
//                                 <input ref={name} id="name" placeholder="Enter your name "></input>
//                                 <p style={{ display: "none"}}>Enter Your Name</p>

//                             </div>
//                             <div className="half first_half">
//                                 <label >Email Id</label>
//                                 <input id="email" placeholder="Enter  Email id "></input>
//                             </div>

//                             <div className="half first_half">
//                                 <label >Mobile No</label>
//                                 <input ref={mobileNo} id="mobile" placeholder="Enter  Mobile No "></input>
//                                 <p style={{ display: "none"}}>Enter Mobile No</p>
//                             </div>
                   
//                             <div className="full">
//                                 <button style={{padding: "8px 22px ",background:"#f2d01b"}} className="button_blue change-Password " onClick={()=>setShowChangePassword(true)}>Change Password</button>
//                             </div>
//                             <div className="full">
//                                 <button onClick={()=>{updateProfile()}} style={{marginLeft:"auto"}} className="button_blue">Save</button>
//                             </div>
//                         </div>
                    

//                 </div>


//             </div>
      
//         </div>
//         }
//        {payout && 
//         <div className ="account">
        
//             <div className="content">
//                 <h1>Payout Information </h1>
//             </div>
//             <div className="body">

//                 <div className="right">
//                 <div className="important">
                
          
//                   <p><img src={icon1}></img>It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in
//                   <br></br> which the Latin words are repeated.It is certainly the most famous placeholder text even if there are different versions distinguishable<br></br> from the order in which the Latin<br></br> words are repeated.It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated.</p>

//                  </div>
//                 <div className="foam_field less_width">
//                             <div className="full df">
//                                 <label htmlFor="name" >Payout Type</label>
//                                 <SelectAndOptionHTMLTag option={["None", "Paypal","Gpay","UPI","Bank Account"]}  prop={setPayoutMethod}/>
//                             </div>
//                             {payoutMethod=="Paypal"&& <div className="full df">
//                                 <label htmlFor="payoutLink" >Payout Link</label>
//                                 <input ref={payoutLink} id="payoutLink" placeholder=" Enter Paypal Link "></input>
//                             </div>}

//                             {payoutMethod=="Gpay"&& <div className="full df">
//                                 <label htmlFor="payoutLink" >Gpay Number</label>
//                                 <input ref={Gpay} id="payoutLink" placeholder=" Enter Gpay Number "></input>
//                             </div>}

//                             {payoutMethod=="UPI"&& <div className="full df">
//                                 <label htmlFor="payoutLink" >Paypal Link</label>
//                                 <input ref={Upi} id="payoutLink" placeholder=" Enter Paypal Link "></input>
//                             </div>}

//                             {payoutMethod=="Bank Account"&& <div className="full df listDown">
//                                 <h5 style={{color:"red",padding:"6px 0"}}> Note: This option is  avaliable for only for Indian Nationalized banks </h5>
//                                 <div className="label-input">
//                                     <label htmlFor="payoutLink" >Bank Name</label>
//                                     <input ref={Bank} id="payoutLink" placeholder=" Enter Bank Name "></input>
//                                 </div>
//                                 <div className="label-input">
//                                     <label htmlFor="payoutLink" >IFSC Code</label>
//                                     <input ref={IFSC} id="payoutLink" placeholder=" Enter IFSC Code "></input>
//                                 </div>
//                                 <div className="label-input">
//                                     <label htmlFor="payoutLink" >Branch Name</label>
//                                     <input ref={Branch} id="payoutLink" placeholder=" Enter Branch Name "></input>
//                                 </div>
//                                 <div className="label-input">
//                                     <label htmlFor="payoutLink" >Account Holder Name</label>
//                                     <input ref={Holder} id="payoutLink" placeholder=" Enter Account Holder Name "></input>
//                                 </div>
//                                 <div className="label-input">
//                                     <label htmlFor="payoutLink" >Account Number</label>
//                                     <input ref={Number} id="payoutLink" placeholder=" Enter Account Number "></input>
//                                 </div>
//                                 <div className="label-input">
//                                     <label htmlFor="payoutLink" >Account Number Again</label>
//                                     <input ref={NumberAgain} id="payoutLink" placeholder=" Enter Account Number Again "></input>
//                                 </div>
//                             </div>}

//                             <div className="full">
//                                 <button onClick={()=>{updatePaymentMethod()}} style={{margin:"auto"}} className="button_blue">Save</button>
//                             </div>
//                         </div>
                    

//                 </div>


//             </div>
      
//         </div>
//         }

//         {transaction && 
//         <div className ="account">
        
//             <div className="content">
//                 <div>
//                     <p>Season</p>
//                     <select>
//                         <option>Current season</option>
//                     </select>

//                 </div>
//             </div>
//             <div className="body">

//                 <div className="right">
//                 <div className="foam_field ">
//                             <div className="half first_half smallest">
//                                 <label htmlFor="name"  >From</label>
//                                 <div className='range'>
//                                 <input className="noradius" id="name" type="text" ></input>
//                                 <DateRangeIcon onClick={showCalendar}/>

//                                 </div>
//                             </div>
//                             <div className="half first_half smallest">
//                                 <label htmlFor="email" >To</label>
//                                 <div className='range'>
//                                   <input className="noradius" id="name" type="text" ></input>
//                                   <DateRangeIcon/>

//                                 </div>
//                             </div>
                  
//                             <div className="half first_half smallest_button">
//                                 <button style={{marginLeft:"auto" }} className="button_blue">Export</button>
//                             </div>
//                         </div>
                    

//                 </div>
             

//             </div>
//             <div className="transactions">
//                 <img src={girl}></img>
//                 <h1>No Transactions Found</h1>

//                 <div className="sub-found">
//                                 <table>
//                                        <thead>
//                                         <tr>
//                                             <th style={{width:"10%",paddingLeft:"10px"}}>Order Id</th>
//                                             <th style={{width:"55%"}}>Description</th>
//                                             <th style={{width:"15%"}}>Date</th>
//                                             <th style={{width:"15%"}}>Transaction Typepe</th>
//                                             <th style={{width:"5%"}}>Total</th>

//                                         </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td data-attr="Order Id"  >ProjectX</td>
//                                                 <td data-attr="Description" >MUI Short Film Festivals</td>
//                                                 <td data-attr="Date" >24 August 2021</td>
//                                                 <td data-attr="Transaction Type" >Credit</td>
//                                                 <td data-attr="Total" >₹ 4860</td>
//                                             </tr>
//                                             <tr>
//                                                 <td data-attr="Order Id"  >ProjectX</td>
//                                                 <td data-attr="Description" >MUI Short Film Festivals</td>
//                                                 <td data-attr="Date" >24 August 2021</td>
//                                                 <td data-attr="Transaction Type" >Credit</td>
//                                                 <td data-attr="Total" >₹ 4860</td>
//                                             </tr>
//                                         </tbody> 



//                                 </table>

//                             </div>

//             </div>
      
//         </div>
//         }


//     </SettingWrapper>
    
    
    
//     </>
//   )
// }




// const SettingWrapper =styled.div`
// width: 100vw;
// background-color: var(--background);
// padding-bottom: 20px;
// h1{
//     font-size: 20px;
//     color: #111;
//     font-weight: 700;
//     padding: 4px 0;

// }
// h2{
//     font-size: 14px;
//     color: #111;
//     padding: 4px 0;
//     font-weight: 600;

// }
// p{
//     font-size: 14px;
//     padding: 4px 0;
//     color: #111;
//     font-weight: 400;
// }
// .p4{
//     padding: 4px 0;
// }
// .p5{
//     padding: 5px 0;
// }
// .p8{
//     padding: 8px 0;
// }
// .mb5{
//     margin-bottom: 5px;
// }
// .mb15{
//     margin-bottom: 15px !important;
// }
// .mb20{
//     margin-bottom: 20px !important;
// }
// .green{
//     color: #2DB482;
// }
// .light_green{
//     background-color: #DAFEF1 !important;
//     color: #2DB482 !important;


// }
// .title{
//     width: 100%;
//     padding-bottom: 20px;
//     font-size: 16px;
// }
// .button_blue{
//         padding: 8px 62px ;
//         background-color: var(--theme);
//         color: white;
//         font-weight: 600;
//         font-size: 16px;
//         border: none;
//         outline: none;
//         border-radius: 5px;
//         margin-bottom: 10px;
//         margin-top: 10px;
//         width: max-content;
// }
// .important{
//         width: 100%;
//         display: flex;
//         background-color: #b9d6fb;
//         padding: 15px;
//         margin-bottom: 40px;
//         border-radius: 10px;

//         &>p{
//             display: flex;
//             align-items: center;
//             color: var(--theme);

//             &>img{
//             height: 30px;
//             width: 30px;
//             float: left;
//             display: block;
//             color: var(--theme);
//             margin-right:20px ;

//         }
//         }

//     }
// .smallest{
//     width: 25% !important;
//     &>label{
//         color: #333;
//         font-weight: 600 !important ;
//     }

// }
// .smallest_button{
//     width: 50% !important; 
//     &>input{
//         border-radius: 0px !important;
//     }
// }
// .noradius{
//     border-radius: 0 !important;
// }


// &>.selector_tab{
//     max-width: var(--maxwidth2);
//     padding: 0;
//     background-color: inherit;
//     box-shadow: none;
//     top: 0;
//     /* margin-top: 5px; */
//     z-index: 999;
//     position: sticky ;
//     top: 118px;

//     @media screen and (max-width:1150px) {
//         position: fixed;

//     }
//     &>.tab{
//         box-shadow: 0 -5px 5px 2px rgba(0,0,0,.1);
//         display: flex;
//         gap: 10px;
//         padding: 10px ;
//         width: max-content;
//         background-color: white;
//         border-top-left-radius: 10px;
//         border-top-right-radius: 10px;
//         margin-left: 0;

//         &>button{
//             padding: 5px 22px;
//             background-color: #ddd;
//             border: none;
//             border-radius: 10px;
//             outline: none;
//             &>h2{
//                 pointer-events: none;
//                 color: inherit;
//             }
            
            
//         }
//     }
// }
// .transactions{
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     min-height: 350px;

//     &>img{
//         height: 130px;
//     }
//     &>.sub-found{
//             width: 100%;
//             margin-top: 20px;

//             &>table{
//                 border-collapse: collapse;
              
//                 position: relative;
//                 width: 100%;
//                 @media screen and (max-width:750px){
//                     thead{
//                         display: none;
//                     }
//                     .tohide{
//                         display: none;
//                     }
//                     tbody{
//                         display: flex;
//                         flex-direction: column;
//                         tr{
//                             width: 90% !important;

//                             margin: 10px auto;
//                             padding: 10px;
//                             border-radius: 10px;
//                             box-shadow:0 0 5px 2px rgba(0,0,0,.2) ;
//                         }
//                         td{
//                             height: max-content !important;
//                             padding: 10px;
//                             width: 100%;
//                             display: block;
//                             ::before{
//                                 content: attr(data-attr);
//                                 padding: 5px 0;
//                                 color: var(--theme);
//                                 display: block;
//                                 font-weight: 600;

//                             }
//                         }
//                     }

//                 }
//                 &>thead{
//                     &>tr{
//                         background-color: #E9E9E9;
//                         width: 100%;
//                         &>th{
//                             height: 50px;
//                             color: #111;
//                             font-size: 14px;
//                             font-weight: 600;
//                             text-align: left;
//                         }
//                     }
//                 }
//                 &>tbody{
//                     &>tr{
//                         width: 100%;
//                         :hover td{
//                             background-color: #DAE8FE;
//                             color: var(--theme) !important;
//                         }
//                         &>td{
//                             height: 50px;
//                             color: #333;
//                             font-size: 14px;
//                             font-weight: 400;

//                         }
//                         &>td:nth-child(1){
//                             padding-left: 10px;
//                         }
//                     }
//                 }
//             }

//         }

// }
// &>div{
//     width: 100vw;
//     max-width: var(--maxwidth2);
//     margin: auto;
//     background-color: white;
//     padding: 0 20px;
//     border-radius: 10px;
//     box-shadow: 0 5px 5px 2px rgba(0,0,0,.1);
//     padding-bottom: 10px;
//     border-top-left-radius: 0;



//     &>.content{
//         padding: 20px 0px 10px 0px;
//         max-width: var(--maxwidth2);
//         margin: auto;
//         /* display: none; */
//         @media screen and (max-width:1150px){
//             padding-top: 56px;
//         }
//         &>div{
//             display: flex;
//             gap: 20px;
//             align-items: center;
//             padding: 0 10px;
//             &>input{
//                 transform: scale(1.3);
//             }
//         }
//         &>div{
//             display: block;
//             width: max-content;
//             margin-left: auto;

//             &>p{
//                 font-size: 14px;
//                 padding: 5px 0;
//                 font-weight: 500;
                
//             }
//             &>select{
//                 padding: 10px 80px 10px 10px;
//                 border-radius: 10px;
//                 font-size: 16px;
//                 background-color: inherit;
//             }
//         }
//     }

//     &>.body{
//         display: flex;
//         width: 100%;
//         position: relative;
//         gap: 20px;
//         padding-top: 20px;
//         @media screen and (max-width:666px) {
//             flex-direction: column;
//             .half{
//                 width: 100% !important;
//             }
//             .change-Password{
//                 width: 100% !important;
//             }
//         }
//         @media screen and (max-width:364px) {
//             .first_half{
//                 width: 100% !important;
//             }
//         }
//         &>.left{
//             flex: 1.5;
//             position: relative;
//         }
//         &>.right{
//             flex: 8;
//             position: relative;
//             &>.foam_field{
//                     display: flex;
//                     position: relative;
//                     flex-wrap: wrap;
//                     @media screen and (max-width:500px){
//                         .smallest_button{
//                             width: 100% !important; 
//                             align-items: center;
//                         }
//                         .smallest{
//                             width:50%  !important;  

//                         }
//                     }

//                         &>.full,&>.half,.label-input{
//                             display: flex;
//                             flex-direction: column;
//                             width: 100%;

//                             label{
//                                 font-size: 14px;
//                                 color: #111;
//                                 font-weight: 500;
//                                 padding-bottom: 5px;
//                             }
//                             input{
//                                 width: 100%;
//                                 margin-bottom: 12px;
//                                 padding: 14px 8px ;
//                                 border-radius: 10px;
//                                 border: 1px solid #999;
//                                 margin-bottom: 20px;
//                                 ::placeholder{
//                                     color: #333;
//                                     font-size: 14px;
//                                     font-weight: 500;

//                                 }
//                                 &:focus{
//                                     outline: 2px solid var(--theme);
//                                     border: none;
                                    
                                    
//                                 }

//                             }
//                             textarea{
//                                 width: 100%;
//                                 margin-bottom: 12px;
//                                 padding: 5px 10px ;
//                                 border-radius: 10px;
//                                 border: 1px solid #999;
//                                 min-height: 140px;
//                                 ::placeholder{
//                                     color: #333;
//                                     font-size: 14px;
//                                     font-weight: 500;
//                                 }
//                                 &:focus{
//                                     outline: 2px solid var(--theme);
//                                     border: none;
                                    
                                    
//                                 }

//                             }
//                             .range{
//                                 width: 100%;
//                                 border: 1px solid #999;
//                                 height: 100%;
//                                 display: flex;
//                                 align-items: center;
//                                 justify-content: center;
//                                 padding: 0 10px;
//                                 input{
//                                     border: none;
//                                     outline: none;
//                                     padding: 5px 8px;
//                                 }
//                             }
                                
//                             &>.submit{
//                                     width: max-content;
//                                     align-self: center;
//                                     display: flex;
//                                     align-items: center;
//                                     padding: 20px 25px;
//                                     background-color: var(--theme);
//                                     height: 36px;
//                                     font-size: 14px;
//                                     line-height: 24px;
//                                     color: var(--heading1);
//                                     outline: none;
//                                     border: none;
//                                     font-weight: 600;
//                                     border-radius: 5px;
//                                     color: white;
//                                     text-decoration: none;
//                                 }
//                         }

//                         &>.half{
//                             display: flex;
//                             flex-direction: column;
//                             width: 50%;
                            


//                         }
//                         &>.first_half{
//                             padding-right: 10px;
//                         }
//                 }
//                 &>.less_width{
//                 width: 60% !important;
//                 min-width: 300px;
//                 margin: auto;
//                 flex-direction: column;
//                 .df{
//                     display: flex !important;
//                     gap: 20px;
//                     flex-direction: row ;
//                     &>label{
//                         white-space: nowrap;
//                         width: 120px;
//                         text-align: right;
//                         font-weight: 600;
//                     }
//                 }
//             }    
//         }

//     }





//     &>.important{
//         width: 100%;
//         display: flex;
//         background-color: #b9d6fb;
//         padding: 15px;
//         margin-bottom: 40px;
//         border-radius: 10px;

//         &>p{
//             display: flex;
//             align-items: center;
//             color: var(--theme);

//             &>img{
//             height: 30px;
//             width: 30px;
//             float: left;
//             display: block;
//             color: var(--theme);
//             margin-right:20px ;

//         }
//         }

//     }

//     &>.result{
//         width: 100%;
//         position: relative;
//         &>div{
//             border: 2px solid #999;
//             margin-top: 5px;

//             &>ul{
//                 &>li{
//                     display: flex;
//                     margin-bottom: 5px;
//                     border-radius: 10px;
//                     background-color: #eee;
//                     padding: 8px 10px;
//                     flex-wrap: wrap;
//                     &>h2{
//                         flex:1;
//                         display: flex;
//                         position: relative;
//                         align-items: center;
//                         pointer-events: none;
//                         &>img{
//                             height: 25px;
//                             width: 25px;
//                             object-fit: contain;
//                             margin-right: 10px;

//                         }

//                     }
//                     &>h2.last{
//                         flex:1;
//                         display: flex;
//                         justify-content: space-between;
//                         position: relative;
//                         &>div{
//                             display: flex;
//                             align-items: center;
//                             gap: 10px;
//                         }
//                         img{
//                             height: 15px;
//                             width: 15px;
//                             object-fit: contain;

//                         }

//                     }
//                     .toopen{
//                         pointer-events: all;
//                         overflow: hidden;
//                         width: 100%;
//                         background-color: white;
//                         height: 0;
//                         overflow: hidden;
//                         &>div{
//                             margin-top: 10px;
//                             &>.top{
//                                 margin: 10px;
//                                 border: 1px solid #999;
//                                 border-radius: 10px;
//                                 padding: 10px;
//                                 min-height: 120px;

//                             }
//                             &>.bottom{
//                                 margin: 10px;
//                                 border: 1px solid #777;
//                                 border-radius: 10px;
//                                 padding: 10px;
//                                 min-height: 140px;
//                                 display: flex;
//                                 &>img{
//                                     height: 130px;
//                                     width: 130px;
//                                     object-fit: cover;

//                                 }
//                                 &>.content{
//                                     display: flex;
//                                     flex-direction: column;
//                                     padding: 5px 20px ;
//                                     gap: 15px;
//                                     width: 100%;
                       
//                                     &>div{
//                                         &>div{
//                                         display: flex;
//                                         gap: 8px;
//                                         align-items: center;
//                                         img{
//                                             height: 22px;
//                                         }
//                                         }
//                                         &>.line{
//                                             padding: 25px 10px;
//                                             border-bottom: 1px solid var(--theme);
//                                             width: 100%;
//                                             flex: 1;
//                                             font-size: 16px;

//                                         }
//                                     }
   


//                                 }
//                             }
//                             &>button{
//                                 padding: 8px 62px ;
//                                 background-color: var(--theme);
//                                 color: white;
//                                 font-weight: 600;
//                                 font-size: 16px;
//                                 border: none;
//                                 outline: none;
//                                 border-radius: 5px;
//                                 margin-left: 10px;
//                                 margin-bottom: 10px;
//                             }

//                         }
//                     }
//                 }
//                 &>li:nth-child(1){
//                     border-radius: 0;
//                 }
//             }
//         }
//     }
//     &>.newmail{
//         &>button{
//                                 padding: 10px 26px ;
//                                 background-color: var(--theme);
//                                 color: white;
//                                 font-weight: 600;
//                                 font-size: 16px;
//                                 border: none;
//                                 outline: none;
//                                 border-radius: 5px;
//                                 margin-bottom: 10px;
//                                 display: flex;
//                                 align-items: center;
//                                 &>img{
//                                     height: 18px;
//                                     margin-right: 5px;
//                                 }
//           }
//           &>.content_email{
//             display: flex;
//             justify-content: center;
//             flex-direction: column;
//             &>img{
//                 height: 120px;
//                 margin-bottom: 15px;
//                 object-fit: contain;
                
//             }
//             &>h1{
//                 margin: auto;
//             }
//             &>p{
//                 margin: auto;

//             }
//             &>button{
//                                 padding: 8px 16px ;
//                                 background-color: var(--theme);
//                                 color: white;
//                                 font-weight: 600;
//                                 font-size: 16px;
//                                 border: none;
//                                 outline: none;
//                                 border-radius: 5px;
//                                 margin-bottom: 10px;
//                                 display: flex;
//                                 align-items: center;
//                                 margin: 10px auto;
                           
//           }
            

//           }
//     }
//     &>.top{
//                                 margin: 10px 0;
//                                 border: 1px solid #999;
//                                 border-radius: 10px;
//                                 padding: 10px;
//                                 min-height: 200px;
//                                 &>p{
//                                     font-size: 16px;
//                                     color: #333;
//                                 }

//     }
//     &>button{
//                                 padding: 8px 54px ;
//                                 background-color: var(--theme);
//                                 color: white;
//                                 font-weight: 600;
//                                 font-size: 16px;
//                                 border: none;
//                                 outline: none;
//                                 border-radius: 5px;
//                                 display: flex;
//                                 align-items: center;
//                                 margin: auto;
                       
//           }
// }
// .listDown{
//     flex-direction: column !important;
//     gap: 0 ;
//     .label-input{
//         display: flex;
//         gap: 10px;
//         flex-direction: row !important;;
//         label{
//             width: 150px;
//         }
//     }
// }
// ` 
// const Profile=styled.div`
// border-radius: 10px;
// background-color: white;
// margin-bottom: 20px;
// width: 100%;
// position: relative;

// &>div{
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     /* padding: 15px 20px ; */
//     &>img{
//         width: 18vw;
//         height:18vw;
//         object-fit: cover;
//         border-radius: 50%;
//         border: 2px solid #aaa;
//         min-width: 250px;
//         min-height: 250px;

//     }
//     &>h1{
//         color: #111;
//         font-size: 20px;
//         font-weight: 500;
//         padding: 15px;
//     }
//     &>p{
//         font-size: 14px;
//         font-weight: 400;
//         padding-bottom: 15px;
//     }
//     &>label{
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         color: #111;
//         font-weight: 600;
//         align-items: center;
//         padding: 8px 0;
//         font-size: 16px;
//         border: none;
//         outline: none;
//         background-color: #ccc;
//         border-radius: 5px;
//         white-space: nowrap;
//         padding-right: 5px;
//         &>i{
//             padding: 0 10px;
//             font-size: 25px;
//             @media screen and (max-width:600px) {
//                 display: none;
//             }
//         }
//     }
//     input{
//         display: none;
//     }
//     &>button:first-of-type{
//         margin-bottom: 10px;
//     }
// }




// `