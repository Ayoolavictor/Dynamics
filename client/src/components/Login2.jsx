import React, {useContext} from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { P2PLENDINGcontext } from "../context/P2PLENDINGcontext";
import { shortenAddress } from "../utils/shortenAddress";

// Components that handles the repay loan page 

const Login2=()=>{ 
  const {repay,currentAccount,refundCollateral,refundCollateralAfterDefault,requestInterest,refundFundDeposited} = useContext(P2PLENDINGcontext);
    //function that handles the Repay button
    const handleRepay=(e)=>{ 
      e.preventDefault();
      repay();
    };
    //function that handles the Withdraw collateral button
    const handleWithdrawCollateral=(e)=>{
      e.preventDefault();
      refundCollateral(); 
    };
    
    //function that handles the Withdraw collateral after default button
    const handleCollateralAfterDefault=(e)=>{
      e.preventDefault();
      refundCollateralAfterDefault();
    };

    //function that handles the withdraw interest button 
    const handleWithdrawInterest=(e)=>{
      e.preventDefault();
      requestInterest();
    };

    //function that handles the withdraw funded amount button
    const handleWithdrawFundedAmount=(e)=>{
      e.preventDefault();
      refundFundDeposited();

    };



    return(
    <div className="flex flex-row flex-1 items-start justify-around w-full mf:mt-0 mt-10 ">
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
                  Borrower Repay Tab
                </p>
              </div>
            </div>
            
         </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <button type="button" onClick={handleRepay} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               REPAY
              </button>

              <button type="button" onClick={handleWithdrawCollateral} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               WITHDRAW COLLATERAL
              </button>

              <button type="button" onClick={handleCollateralAfterDefault} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               WITHDRAW COLLATERAL AFTER DEFAULT
              </button>

             </div>

        </div>



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
                  ox
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Lenders Interest Tab
                </p>
              </div>
            </div>
            
          </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <button type="button" onClick={handleWithdrawInterest} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               WITHDRAW INTEREST
              </button>

              <button type="button" onClick={handleWithdrawFundedAmount} className="text-white w-full mt-2 border-[1px] rounded-full p-2 border-[#425585] cursor-pointer"> 
               WITHDRAW FUNDED AMOUNT
              </button>

           </div>

            

        </div>
    
    </div>

    )


}
export default Login2;