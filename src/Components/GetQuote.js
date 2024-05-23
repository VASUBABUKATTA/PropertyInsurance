import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { regexEmail, regexMobileNo, regexPassword, regexUsername } from './RegularExpressions';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import TextField from '@mui/material/TextField';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import RamanaLogo from './images/p4.jpeg'
import shield from './images/shield.png'
import care from './images/care.png'
import '../App.css'
import Header from './Header';
import { useSpring, animated } from 'react-spring';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import Button from 'bootstrap/js/dist/button';
import Dropdown from 'bootstrap/js/dist/dropdown';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {toast } from 'react-toastify';





function GetQuote() 
{
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const { state } = location;

  const [otpValues, setOtpValues] = useState(Array(4).fill(''));
  const [otpemailValues, setOtpemailValues] = useState(Array(4).fill(''));
  // const [enterotp,SetEnterOtp]=useState("");
  const [otp, setOtp] = useState(Array(4).fill('')); 
  const [emailotp, SetemailOtp] = useState(Array(4).fill('')); 
  const [verifymobilmsg,Setverifymobilmsg]=useState("");
  const [verifyemailmsg,Setverifyemailmsg]=useState("");
  const [emailverified,setemailverified]=useState("send OTP");
  const [mobileverified,setmobileverified]=useState("send OTP");
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const otpInputs = useRef([]);
  const emailInputs= useRef([]);

  const handleOtpInputChange = (index, value) => {
    if (value.match(/[0-9]/)) {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
    }
};
  const handleOtpemailInputChange = (index, value) => {
    if (value.match(/[0-9]/)) {
        const newOtpemailValues = [...otpemailValues];
        newOtpemailValues[index] = value;
        setOtpemailValues(newOtpemailValues);
    }
};
const handleMobileOtpChange = (index, value) => {
  try{

  
  if (value.length > 1) return;

  const updatedOtp = [...otp];
  updatedOtp[index] = value;
  setOtp(updatedOtp);

  if (value && index < 4) {
    if (index < 3 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    }
  } else if (index > 0 && otpInputs.current[index - 1]) {
    otpInputs.current[index - 1].focus();
  }
}catch(err){
  console.log("error while otp updating:",err);
}
};

const handleEmailOtpChange = (index, value) => {
  try{
  if (value.length > 1) return;



  const updatedemailOtp = [...emailotp];
  updatedemailOtp[index] = value;
  SetemailOtp(updatedemailOtp);
  if (value && index < 4) {
    if (index < 3 && emailInputs.current[index + 1]) {
      emailInputs.current[index + 1].focus();
    }
  } else if (index > 0 && emailInputs.current[index - 1]) {
    emailInputs.current[index - 1].focus();
  }
}catch(err){
  console.log("error while otp updating:",err);
}
};


  const marketValue = state?.formValues?.marketValue ;
  // console.log( marketValue);

  const security=state?.formValues?.security ;

   const buildingAge = state?.formValues?.buildingAge;

   const squareFeet = state?.formValues?.squareFeet;
   const pincode = state?.formValues?.pincode;
   const person = state?.formValues?.person;
   const effected = state?.formValues?.effected;

  

  // const [value,setValue]=useState();
  const [Premium,setPremium]=useState();
  const [year,setYear]=useState();
  function handleGoBack(){
    window.history.back();
  }

  const [showOTPInput,setshowOTPInput]=useState(false);
 
  
  function sendOTP(e){
  e.preventDefault();
    // setshowOTPInput(true);
    if(regexMobileNo.test(feilds.mobileno)){
    PropertyInsuranceService.checkMobileNumber(feilds.mobileno).then((res)=>
      {
        console.log(res.data);
        setData(res.data);
        if(res.data === "Mobile number is not exists"){
          PropertyInsuranceService.getOtp1().then((res)=>
          {
            console.log(res.data);
            const otpValue=res.data;
            setOtp(res.data);
            setshowOTPInput(true);
            const mobileNumber=values.mobileno;
            PropertyInsuranceService.getOtp(mobileNumber,otpValue).then((res)=>
          {
            console.log(res);
          }).catch((err)=>
        {

        });
          }).catch((error)=>
        {})

        console.log(showOTPInput);
        setshowOTPInput(true);
         
          //  SetVerifyOtp("");
        }
        else if(res.data === "Mobile number exists")
        {
          setshowOTPInput(false);
        }
        })
    console.log(showOTPInput);
  }
  else
  {
    setshowOTPInput(false);
  }
}
  const caliculate1=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    
   
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(1);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10));
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No") {
      let baseRate = 0.002;
      setYear(1);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  if(marketValue!==undefined)
  {
    setYear(1);
    setPremium(Math.floor((marketValue*baseRate)*10));
  }

  // setValue(marketValue);
  console.log(baseRate);
    }
}
  const caliculate2=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    // setYear(2);

    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(2);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No") {
      let baseRate = 0.002;
       setYear(2);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  if(marketValue!==undefined)
  {
    setYear(2);
    setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  }

  // setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  // setValue(marketValue);
  console.log(baseRate);
    
      }
    
  }
  
  const caliculate3=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    
    // setYear(3);
    
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(3);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No"){
      let baseRate = 0.002;
       setYear(3);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  
  if(marketValue!==undefined)
  {
    setYear(3);
    setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  }
  // setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  // setValue(marketValue);
  console.log(baseRate);
    
  }
  }
  
  const caliculate4=()=>
  {
    if(marketValue===undefined)
    {
      setYear();
      setUrlCopy(true)
    }
    // setYear(4);
    
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(4);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No"){
      let baseRate = 0.002;
      setYear(4);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  if(marketValue!==undefined)
  {
    
    setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  }

  // setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  // setValue(marketValue);
  console.log(baseRate);

  }
  }

  const caliculate5=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    // setYear(5);
    
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(5);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No") {
      let baseRate = 0.002;
      setYear(5);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  if(marketValue!==undefined)
  {
    setYear(5);
    setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  }

  // setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  // setValue(marketValue);
  console.log(baseRate);

    }
  }

  const [data,setData] = useState("");
  const [data1,setData1] = useState("");
  const [login,setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showstate , setState] = useState(false);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);

    // Call your calculate function based on selected year
    switch (selectedYear) {
        case 1:
            caliculate1();
            break;
        case 2:
            caliculate2();
            break;
        case 3:
            caliculate3();
            break;
        case 4:
            caliculate4();
            break;
        case 5:
            caliculate5();
            break;
    }
};



  // useEffect(() => {
  //   const storedYear = sessionStorage.getItem('year');
  //   const storedPremium = sessionStorage.getItem('Premium');
  //   setYear(storedYear ? parseInt(storedYear, 10) : null);
  //   setPremium(storedPremium ? parseInt(storedPremium, 10) : null);
  // }, []);
  
  let startingCustomerId = parseInt(localStorage.getItem('customerId')) || 11110;

 
   const [feilds, setFeilds] = useState({
    name: '',
    mobileno: '',
    email: '',
    customerId:"",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    mobileno: '',
    email: '',
    password: '',
  });

   const [values, setValues] = useState({
      mobileno: '',
      password: '',
      email: '',
    });
  
  const change=(e)=>
  {
        const {name,value}=e.target;
       setFeilds({...feilds,[name]:value});

       setValues({...values,[name]:value});

        // validation name:
        if(name === "name"){
          if(!regexUsername.test(value))
          {
            setValidationErrors({ ...validationErrors, [name]: "Full Name must be 3 or more character ex: abc" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
        }

        // validation for mobile no :
        if(name === "mobileno"){
          if(!regexMobileNo.test(value))
          {
            setValidationErrors({ ...validationErrors, [name]: "Phone must start with 6,7,8,9 series with  10 digits" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
          }

          // validation for email :
          if(name === "email"){
            if(!regexEmail.test(value))
            {
              setValidationErrors({ ...validationErrors, [name]: "Please enter valid email ex: example@gmail.com" });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          // validation for password :
          if(name === "password")
          {
            if(!regexPassword.test(value))
            {
              setValidationErrors({ ...validationErrors, [name]: "password  1 uppercase letter, 1 special symbol and 1 digit minlength 8" });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          sessionStorage.setItem(name, value);
  }

 

  useEffect(() => {
    // Retrieve feilds data from sessionStorage
    const storedName = sessionStorage.getItem('name');
    const storedMobileNo = sessionStorage.getItem('mobileno');
    const storedEmail = sessionStorage.getItem('email');
    const storedPassword = sessionStorage.getItem('password');

    // Update feilds state with sessionStorage data if available
    if (storedName) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, name: storedName }));
    }
    if (storedMobileNo) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, mobileno: storedMobileNo }));
    }
    if (storedEmail) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, email: storedEmail }));
    }
    if (storedPassword) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, password: storedPassword }));
    }
}, []);


var j = location.state?.i;
var i=0;
  const handleSignUp = () =>
   {
      if(marketValue===undefined)
      {
        setUrlCopy(true);
        setShowModal(false);
       
      }
    if((year === 1 || year === 2 || year === 3 || year === 4 || year === 5 )&& i === 0 && j === undefined )
    {
      i++;
       console.log(i);
       if(marketValue===undefined)
       {
        setShowModal(false);
       }
       else{
        setShowModal(true)
       }
       
      }
        
      else if (j>0){

        if(year === 1 || year === 2 || year === 3 || year === 4 || year === 5 )
        {
          
        i=j;
         setShowModal(false);

          navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
        }
        else {
          setState(true);
        }
      }
     
      else {
        setShowModal(true)
        console.log(year)
      }
    
  };
  // const handleSignUp = ()=>
  // {
  //   navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
  // }
   const [customer,setCustomer] = useState("");
  const [signUpDetails, setSignUpDetails] = useState([]);

  // useEffect(() => {
  //   if (values.mobileno) {
  //     PropertyInsuranceService.getCustomerIdByMobileNo(values.mobileno)
  //       .then((res) => {
  //         setSignUpDetails(res.data);   
  //   });
  // }
  // });
  
  const signUpRows = signUpDetails.map((details) => (
    <tr key={details.id}>
     {details.email}
    </tr>
  ));
  const signUpRowsAsString = signUpRows.map(row => row.props.children); 
  values.email = signUpRowsAsString.join(', ');

  // console.log(feilds);
  const [verify, setVerify]=useState(false);
 
  const handleClose = () => setShowModal(false);
  const clickClose =()=> setState(false);
  const clickClosebutton =()=> setLogin(false);

  const closeVerify=()=>
    {
  setVerify(false);
    }
  // navigating signup page :
  const navigate=useNavigate();

  const handleClick=(e)=>{

    e.preventDefault();
    
    console.log(i);


    if(regexUsername.test(feilds.name) && regexMobileNo.test(feilds.mobileno) && regexEmail.test(feilds.email) && isemailverified && ismobileverified)
      {
        const s=feilds.mobileno;
        const d=feilds.email;
        console.log(s)
        console.log(d)
        
        PropertyInsuranceService.createCustomer(feilds).then(res=>
          {
            // alert("signup donme");
            console.log(res.data);
          }
        );
  
      // PropertyInsuranceService.checkEmail(d).then((res)=>{
        
      //  const check=res.data;
      //   console.log(check);
      //   setData1(check);
       
    //   PropertyInsuranceService.checkMobileNumber(s).then((res)=>{
       
    //     console.log(res.data);
    //    setData(res.data);
    //     const ch=res.data;
    //     console.log(ch);
        
    //     if(ch === "Mobile number is not exists" && check ==="email is not exists")
    //  {
    
         i++;
   
        console.log(i);
       navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
     
        console.log("feilds =>"+JSON.stringify(feilds));
        // PropertyInsuranceService.createCustomer(feilds);

      }

      else{
        if (!toastDisplayed) {
          toast.error("please verify email, mobile");
          setToastDisplayed(true); 
        }
        
        
      }
    //  })
  //  })
    
      
    //  }

  }

i++;
  
  const handleClicksignup =(e)=>
      {
        e.preventDefault();
        
        async function performLogin(){
        
          const response = await PropertyInsuranceService.login(feilds);
          console.log(response)
          const loginResponse = response.data; 
          //  setCustomer(loginResponse);
          console.log('Login Response:', loginResponse);
       
          i++;
            console.log(i);

          if (loginResponse === "Login successful!") 
          { 
         
            
            // setshowState(true);
            //  navigate("",{state:{values:values}})
        
            navigate("/fill", { state: { formData: values, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
            
          } 
          else 
          {
            
             setCustomer(loginResponse);
          }
      }
      performLogin();
      }

      const hanldeKey=(event)=>
        {
          // e.preventDefault();
          const charCode=event.which ? event.which : event.keyCode;

          if((charCode<48 || charCode>57 ) && charCode!==8  &&  (charCode<37 || charCode>40)  )
          {
            event.preventDefault();
          }
        }

        const[urlCopy,setUrlCopy]=useState();
        const urlOk=()=>
        {
          navigate("/property");
        }
        
        const [isBuyNow, setIsBuyNow] = useState(false);

        const slideAnimation = useSpring({
          from: { transform: 'translateX(50%)' },
          to: { transform: isBuyNow ? 'translateX(-100%)' : 'translateX(0%)' },
          delay: 2000, // Delay for 1 second
          onRest: () => setIsBuyNow(!isBuyNow)
        }); 

  const [MobileOTPInput,setMobileOTPInput]=useState(false);
  const [EmailOTPInput,setEmailshowOTPInput]=useState(false);

 
  
  // function sendOTP(e){
  // e.preventDefault();
  //   setshowOTPInput(true);
  //   console.log(showOTPInput);
  // }
  function sendemailOTP(e){
  e.preventDefault();
    if(regexEmail.test(feilds.email)){
      PropertyInsuranceService.checkEmail(feilds.email).then((res)=>{
        console.log(res.data);
        setData1(res.data)
    
        if(res.data==="Email is not exists"){
          setEmailshowOTPInput(true)
       
    PropertyInsuranceService.sendEmailOtp(feilds.email).then((res)=>{
      setEmailshowOTPInput(true);
      SetemailOtp(res.data);
    })
    console.log(EmailOTPInput);
  }
})
  }
  else
  {
    console.log(feilds.email);
    setEmailshowOTPInput(false);
  }
        
  }


const[ismobileverified, setisMobileVerifired]=useState(false);
const[isemailverified, setisEmaailverified]=useState(false);
  const handleverifyEmailOtp=(e)=>{
    e.preventDefault();
    console.log("fhfgh")
    setEmailshowOTPInput(false);
    const enteredemailotp=otpemailValues.join('');
    console.log(emailotp);
    console.log(enteredemailotp);
    if(emailotp== enteredemailotp){
      setEmailshowOTPInput(false)
      setemailverified("verified 🗸")
      setisMobileVerifired(true);
    }else{
      setEmailshowOTPInput(true);
      Setverifyemailmsg("Invalid OTP...!");
    }

  }

  const handleverifyMobileOtp=(e)=>{
    e.preventDefault();
    console.log("fhfgh")
    setMobileOTPInput(false);
    const enteredmobileotp=otpValues.join('');
    console.log(enteredmobileotp); 
    console.log(otp);
    if(otp==enteredmobileotp){
      console.log("done")
      setshowOTPInput(false);
      setmobileverified("verified 🗸")
      setisEmaailverified(true);
    }else{
      setMobileOTPInput(true);
      Setverifymobilmsg("Invalid OTP...!");
    }

  }
  return (
    <div className='property'>
      <Header/>
    <div className='container-fluid pt-lg-3'>
      <div className='row mt-lg-5'>
       <div className='col-12 col-lg-3 col-md-10 ms-lg-3 order-2 order-lg-1 gqfcol'>
       <div class="card mt-2 mb-3" >
        <div class="card-body bg-light border border-warning rounded shadow gqcards">
           <h5 class="card-title bg-warning-subtle text-center rounded p-1 fw-bold">Secure your home rightfully!</h5>
           <p class="card-title bg-secondary-subtle text-center rounded p-1 fw-bold">You have the right to buy home insurance from RamanaSoft</p>
            <ui className="custom-bullet">
              <li style={{whiteSpace:'nowrap'}}><span className='fw-bold'>Banks accept</span> all online bought policies</li>
              <li style={{whiteSpace:'nowrap'}}><span className='fw-bold'>Instant policy </span> with zero documentation</li>
              {/* <li style={{whiteSpace:'nowrap'}}>save <span className='fw-bold'>up to 25%</span> by comparing plans</li> */}
              <li style={{whiteSpace:'nowrap'}}>Buy <span className='fw-bold'>without unwanted </span> addons!</li>
            </ui>
            <small className='text-secondary ms-4'>Standard <span><a href='#offcanvasExample' data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample" className='text-decoration-none'>terms & conditions</a></span> apply.</small>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-secondary fw-bold" id="offcanvasExampleLabel">Terms & Conditions</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <ul>
              <li className='px-2'>
                <b>Coverage Scope: </b>Property insurance covers damage or loss to your property due to specified perils, such as fire, theft, vandalism, and natural disasters. The coverage may extend to the building structure, contents, and personal belongings within the premises.
              </li>
              <li className='px-2'>
                <b>Policy Limits: </b>The policy will specify the maximum amount the insurance company will pay out for covered losses. It's essential to review these limits and ensure they adequately protect your property.
              </li>
              <li className='px-2'>
                <b>Deductibles: </b> You may be required to pay a deductible before the insurance coverage kicks in. The deductible amount is typically chosen by the policyholder and can affect the cost of premiums.
              </li>
              <li className='px-2'>
                <b>Premiums: </b>  Premiums are the regular payments you make to maintain coverage. The amount of the premium is determined by factors such as the value of the insured property, location, and risk factors.
              </li>
              <li className='px-2'>
                <b>Claims Process: </b>  In the event of a covered loss, you must promptly notify the insurance company and file a claim. The insurer will investigate the claim and assess the damage before determining the payout.
              </li>
              <li className='px-2'>
                <b>Policy Renewal: </b> Property insurance policies are typically renewable annually. The insurer may review and adjust premiums, coverage limits, and terms at the time of renewal.
              </li>
            </ul>
          </div>
        </div>
      </div>
        </div>
     </div>

<div class="card text-center mb-3">
  <div class="card-body bg-light border border-danger rounded shadow">
    <h5 class="card-title text-start bg-danger-subtle rounded fw-bold p-1 text-center">Entire Housing Society</h5>
    <p class="card-text">Secure your entire housing society against <br/><ul className='d-flex justify-content-around fw-semibold mt-1'><li className='me-2'>Fire</li><li className='me-2'>Theft</li><li className='me-2'>Natural disasters</li></ul> </p>
    {/* <button  class="btn text-success border fw-bold"><HomeIcon /></button> */}
  </div>
</div>

<div class="card text-center">
  <div class="card-body bg-light border border-primary rounded row">
    <h5 class="card-title fw-bold bg-secondary-subtle rounded text-dark">Talk to Expert</h5>
    <div className='col mt-lg-2 rounded'>
      <img src={care} className='img-fluid care' alt='customer care'></img>
    </div>
    <div className='col-lg-8'>
    <p class="card-text ">Our agent can help you to buy the best home insurance!</p>
    <button  className="btn fw-bold text-primary border mb-1"><PhoneIcon />Talk to Expert</button><br/>
    <span className=''>(1800-143-143)</span>
    </div>
  </div>
</div>
</div>
       <div className='col-12 col-lg-8 ms-lg-5 ms-2 order-1 order-lg-2'>
       <div className='d-flex justify-content-around align-items-center flex-wrap'>
  <div>
    <a onClick={handleGoBack} title="Back">
      <KeyboardArrowLeftOutlinedIcon className='border bg-light fs-1 fs-lg-2 rounded text-primary' />
    </a>
  </div>
  <div className='col-7 ms-4 col-lg-4 mb-4 mt-5 mt-lg-0 pt-lg-0 pt-3'> 
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" className='fw-bold'>Select Years</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Age of the Building"
        className='fw-bold'
        onChange={handleYearChange}
        required
      >
        <MenuItem value={1} onClick={caliculate1}>1 Year</MenuItem>
        <MenuItem value={2} onClick={caliculate2}>2 Years</MenuItem>
        <MenuItem value={3} onClick={caliculate3}>3 years</MenuItem>
        <MenuItem value={4} onClick={caliculate4}>4 years</MenuItem>
        <MenuItem value={5} onClick={caliculate5}>5 years</MenuItem>
      </Select>
    </FormControl>
  </div>
  <div>
    <p className='ms-4 fw-bold text-secondary'>All premiums are inclusive of GST</p>
  </div>
</div>

        <div class="card ">
          <img src={shield} style={{width:'45px',position:'absolute'}} title='secure' alt="100% secured"className='p-2 bg-light rounded'></img>
  <div class="card-body d-flex flex-column flex-md-row justify-content-md-around align-items-center p-3">
    <div>
    <img src={RamanaLogo}title='RamanaSoft' alt='company-logo' className='rounded shadow' style={{width:'60px'}}></img>
    </div>
    <div>
    <h5 class="card-title fw-bold mt-3">RamanaSecure Living</h5>
    </div>
    <div>
    <p class="card-text fw-bold text-secondary">Policy Term</p>
    <h5 className='text-center fw-bold'>{year?year:0}{' '}{year===1?'year':'years'}</h5>
    </div>
    <div className='mt-2 mt-md-0'>
    <div className="">
      {/* <button className="hover-button btn-primary fw-bold  buy shadow px-5 py-3 rounded mt-lg-2"  onClick={handleSignUp}>
        <span className="default-text mt-1">&#x20B9; {Premium?Premium:0}/-</span>
        <span className="hover-text mt-1">Buy Now</span>
      </button> */}
      <button style={{ position: 'relative', width: '150px', height: '50px', overflow: 'hidden' }} className='btn btn-primary rounded buy shadow fw-bold' onClick={handleSignUp} disabled={!year}>
      <animated.div style={{ ...slideAnimation, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {isBuyNow ? 'Buy Now' : ` ₹${Premium?Premium:0}/-`}
      </animated.div>
    </button>
    </div>
    <p className='text-secondary mt-1 ms-2'>inclusive of all taxes.</p>


    </div>
  </div>
  <div class="card-footer text-body-secondary text-center fw-bold">
    <div className='d-flex flex-column flex-md-row  justify-content-evenly mt-2'>
    <p className='text-secondary pe-4'style={{borderRight:'6px solid #ccc'}}>Property Value -<span className='fw-bold text-dark'>&nbsp;{marketValue}</span></p>
    <p className='text-secondary' >Age Of The Building -<span className='fw-bold text-dark'>&nbsp;{buildingAge}</span></p>
    <p className='text-secondary px-3'style={{borderLeft:'6px solid #ccc'}}>SquareFeet -<span className='fw-bold text-dark'>&nbsp;{squareFeet}</span></p>
    </div>
  </div>
</div>
       </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton  >
            <Modal.Title ><h3 className='text-center fw-bold text-secondary'>SignUp with <img src={RamanaLogo}alt='logo' className='rounded'style={{width:'60px', height:'40px'}}></img></h3></Modal.Title>
            </Modal.Header>
            <Modal.Body className='mx-3'>         
              <form onSubmit={handleClick}>
                <div className='row'>
                <div className='col-12'>
                 <TextField
                    className='mt-2 w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    // label="Full Name"
                    placeholder=" Full Name"
                    name='name'
                    required
                    value={feilds.name}
                    onChange={change}
                    inputProps={{ maxLength: 30 }}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                  />
                  </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 col-lg-8'>
                  
                  <TextField
                    className='mt-3 w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    // label="Email-Id"
                    placeholder="Mail-Id"
                    disabled={emailverified==="verified 🗸"}
                    name='email'
                    required
                    value={feilds.email}
                    onChange={change}
                    inputProps={{ maxLength: 50 }}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    /><br/>
                    </div>
                    <div style={{float:'right'}} className='col-12 col-lg-4'>
                    <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow verification' disabled={emailverified==="verified 🗸"} onClick={sendemailOTP}>{emailverified}</button>
                    </div>
                    {data1 === "Email is exists" && <h5 className='text-danger'>{data1}</h5>}
                    {EmailOTPInput && (
                  <div>
                     <div className='ms-5'>
                      <small className='text-success'>OTP sent to your email address</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                      {[...Array(4)].map((_, index) => (
                      <input 
                        key={index} 
                        type="text"
                        autoFocus={index === 0}
                        ref={(input) => emailInputs.current[index] = input}
                        onChange={(e) => 
                          {handleOtpemailInputChange(index, e.target.value);
                            handleEmailOtpChange(index, e.target.value);}}
                        className='w-25 border ps-2 fw-bold' 
                        maxLength={1} 
                        style={{ marginRight: '8px' }}
                        onKeyPress={(e) => {
                          const isValidInput = /[0-9]/;
                          if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                          }
                        }}
                      />
                       ))}
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-3'onClick={handleverifyEmailOtp}>Verify OTP</button>
                      </form>
                       {verifyemailmsg === "Invalid OTP...!"&& <h5 className='mt-2 ms-2 text-danger'>{verifyemailmsg}</h5>}
                     </div>
                  </div>
                    )}
                  </div>
                    <div className='row mt-2'>
                      <div className='col-12 col-lg-8'>
                 <TextField
                    className=' mt-1 w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    // label="Mobile No."
                    placeholder="Mobile No."
                    name='mobileno'
                    required
                    value={feilds.mobileno}
                    disabled={mobileverified ==="verified 🗸"}
                    onChange={change}
                    inputProps={{ maxLength: 10 }}
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9]/;
                      if (!isValidInput.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    autoComplete='off'
                    error={!!validationErrors.mobileno}
                    helperText={validationErrors.mobileno}
                    /><br/>
                    </div>

                  <div style={{float:'right'}} className='col-12 col-lg-4'>
                    <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow' disabled={mobileverified ==="verified 🗸"} onClick={sendOTP}>{mobileverified}</button>
                  </div>
                  {data === "Mobile number exists" && <h5 className='text-danger'>{data}</h5>}
                  {showOTPInput && (
                  <div>
                     <div className='ms-5'>
                      <small className='text-success '>OTP sent to your mobile Number</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                      {[...Array(4)].map((_, index) => (
                      <input key={index} type="text"
                       className='w-25 border ps-2 fw-bold' 
                       maxLength={1} 
                       style={{ marginRight: '8px' }}
                       autoFocus={index === 0}
                       ref={(input) => otpInputs.current[index] = input}
                          onChange={(e) => 
                            {handleOtpInputChange(index, e.target.value);
                              handleMobileOtpChange(index, e.target.value);}}
                       onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      />
                       ))}
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-3' onClick={handleverifyMobileOtp}>Verify OTP</button>
                      </form>
                      {verifymobilmsg === "Invalid OTP...!"&& <h5 className='mt-2 ms-2 text-danger'>{verifymobilmsg}</h5>}

                     </div>
                  </div>
                    )}
                  </div>
                  <hr></hr>
                  <div className='d-flex justify-content-center me-4'>
                  <div className=''>
                    <input type='submit' value="SignUp" className='btn btn-primary shadow px-5 fw-bold mb-2 shadow'/>
                  </div>
                </div>
                
              </form>

              <div>
              </div>
            </Modal.Body>
          </Modal>
    </div>

    <div>
           <Modal show={showstate} onHide={clickClose} className='text-center' >

                <Modal.Body>
                  <h4 className='mt-5'>Please Select Any one Of The Year Premium</h4>
                  <button className='btn btn-outline-primary my-5' onClick={clickClose} >Close</button>
                </Modal.Body>
               
            </Modal>
    </div>
    <div>
           <Modal show={urlCopy}  className='text-center' >

                <Modal.Body>
                  <h4 className='mt-5'>Please Enter the Property Details</h4>
                  <button className='btn btn-outline-primary my-5 px-4' onClick={urlOk} >OK</button>
                </Modal.Body>
               
            </Modal>
    </div>

    </div>
  );
}

export default GetQuote;