import React,{useContext} from "react";
import {P2PLENDINGcontext} from "../context/P2PLENDINGcontext"
import { shortenAddress } from "../utils/shortenAddress";
//Function that handles the transaction card props
const TransactionCard=({borrower,requestedAmount,collateralAmount,repaymentInstallment,returnAmount,dateLoanPaid})=>{
    return (
    <div className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl">
        <div  className="flex flex-col items-start w-full mt-3">
            <div className="w-full mb-6 p-2"> 
                <p className="text-white text-base">Borrower: {shortenAddress(borrower)}</p>
                <p className="text-white text-base">Amount of Loan Requested: {requestedAmount}</p>
                <p className="text-white text-base">Collateral Deposited: {collateralAmount}</p>
                <p className="text-white text-base">Amount of installmental payment: {repaymentInstallment}</p>
                <p className="text-white text-base">Overall Amount returned: {returnAmount}</p>
                <p className="text-white text-base">Date of Repayment: {dateLoanPaid}</p>


            </div>


        </div>
    


    </div>


    )


    
}

//Main transaction component that handles the transaction page
const Transactions=()=>{
    const {currentAccount,transactions}= useContext(P2PLENDINGcontext);
    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount?(
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                ):(
                    <h3 className="text-white text-3xl text-center my-2">Connect your Account to see Latest Transactions</h3>

                )}
                <div className="flex flex-wrap justify-center items-center mt-5">
                 {transactions.reverse().map((transaction,i)=>(
                    <TransactionCard key={i} {...transaction}/>
                 ))}


                </div>



            </div>


        </div>

    )

}

export default Transactions;