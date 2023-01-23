import React, {useContext} from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { P2PLENDINGcontext } from "../context/P2PLENDINGcontext";
import { shortenAddress } from "../utils/shortenAddress";
const Input=({placeholder,name,type,value,handleChange})=>(
    <input
     placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"

    
    />

);



const Login=()=>{
  const {formData,currentAccount, applyForLoan,handleChange,borrowersCollateral,withdraw,invest}= useContext(P2PLENDINGcontext);
  
  const handleSubmit=(e)=>{ 
    const{requestedAmount,collateralAmount,requestedNumberRepayment,dateLoadPaid}=formData;
    e.preventDefault();

    if(!requestedAmount && !collateralAmount && !requestedNumberRepayment && !dateLoadPaid)return;
    applyForLoan();
      

  };
  const handleDeposit=(e)=>{
    
    e.preventDefault();
    borrowersCollateral();



  };
  const handleWithdrawLoan=(e)=>{
    e.preventDefault();
    withdraw();


  }
  const handleInvest=(e)=>{
    const {lendersdeposit}=formData;
    e.preventDefault();
    if(!lendersdeposit)return;
    invest();



  };

  return(
    
    <div className="flex flex-row flex-1 items-start justify-around w-full mf:mt-0 mt-10">
      <div className="flex flex-col items-start">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40  w-full eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Borrower Loan Details
                </p>
              </div>
            </div>
            
            </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Requested Amount" name="requestedAmount" type="number" handleChange={handleChange} />
            <Input placeholder="Collateral Amount" name="collateralAmount" type="number" handleChange={handleChange} />
            <Input placeholder="Requested Number of installment" name="requestedNumberRepayment" type="number" handleChange={handleChange} />
            <Input placeholder="Date Loan would be paid" name="dateLoanPaid" type="number" handleChange={handleChange} />
            <div className="h-[1px] w-full bg-gray-400 my-2"/>
            
            <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               SUBMIT


            </button>
            </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          
            
              <button type="button" onClick={handleDeposit} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               DEPOSIT COLLATERAL


              </button>

            
           
              
              <button type="button" onClick={handleWithdrawLoan} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               WITHDRAW LOAN


              </button>

            
           

           </div>
          

      </div>

     <div className="flex flex-col items-start">
     <div className="p-3 flex-col justify-end items-start  rounded-xl h-40 w-full eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  ox
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Lender
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Deposit " name="lendersdeposit" type="number" handleChange={handleChange} />
            
            <div className="h-[1px] w-full bg-gray-400 my-2"/>
            
              
            <button type="button" onClick={handleInvest} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               DEPOSIT LENDING AMOUNT


              </button>

            

            
           

          </div>
          </div>
         
         

    </div>


      


    
    
  )

}

export default Login;