import React, {useEffect,useState} from "react";
import {ethers} from "ethers";
import{contractABI,contractAddress} from "../utils/constants";

export const P2PLENDINGcontext=React.createContext();
const {ethereum} =window;

//Function to get smart contract 
const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const p2plendingContract=new ethers.Contract(contractAddress,contractABI,signer);
    return p2plendingContract;
}

export const P2PLENDINGProvider=({children})=>{
    //Different states use in the front end that needs to be updated 
    const [currentAccount,setCurrentAccount] = useState('')
    const[formData, setFormData]=useState({requestedAmount:"",collateralAmount:"",requestedNumberRepayment:"",dateLoanPaid:"",lendersdeposit:""});
    const [isLoading, setIsLoading] = useState(false);
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}));
    };
    const [transactions, setTransaction] = useState([])

    //Function to check if a wallet is connected 
    const checkIfWalletIsConnected=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
        const accounts=await ethereum.request({method:"eth_accounts"});
        if(accounts.length){
            setCurrentAccount(accounts[0]);
            getTransactionInfo();
           

        }else{
            console.log("No accounts found");
        }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");

            
        }
        
    }
   // Function to connect wallet 
    const connectWallet=async()=>{
        try {
             if (!ethereum) return alert("Please Install Metamask");
             const accounts=await ethereum.request({method:"eth_requestAccounts"});
             setCurrentAccount(accounts[0]);
             
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
            
        }


    }
    //Function that would be used to apply for loan
    const applyForLoan=async()=>{
        try { 
            if (!ethereum) return alert("Please Install Metamask");
            const{collateralAmount, requestedAmount,requestedNumberRepayment,dateLoanPaid}=formData;
            const p2plendingContract=getEthereumContract();
            const parsedAmount=ethers.utils.parseEther(requestedAmount);
            const parsedCollateralAmount=ethers.utils.parseEther(collateralAmount);
            const parsedRequestedAmount=ethers.utils.parseUnits(requestedNumberRepayment,0);
            const parsedDateLoanPaid=ethers.utils.parseUnits(dateLoanPaid,0)
            
            const transactionHash=await p2plendingContract.applyForLoan(parsedCollateralAmount, parsedAmount,parsedRequestedAmount,parsedDateLoanPaid);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);
            
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");

            
        }




    };

    //Function that will be used to deposit collateral
    const borrowersCollateral=async()=>{
        try { 
            if (!ethereum) return alert("Please Install Metamask");
            
            const p2plendingContract=getEthereumContract();
            const creditInfo=await p2plendingContract.getCreditInfo();
            const collateralAmount=creditInfo[2];

            const transactionHash=await p2plendingContract.borrowersCollateral({gasLimit: 100000,value:collateralAmount});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
            
        }

    }
    //Function that would be used by the borrower to withdraw loan
    const withdraw=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const transactionHash=await p2plendingContract.withdraw({gasLimit: 100000});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
            
            
        }



    };
    //Function that will be used by the lenders to invest 
    const invest=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const {lendersdeposit}=formData;
            
            const transactionHash=await p2plendingContract.invest({gasLimit: 100000,value:ethers.utils.parseUnits(lendersdeposit,"ether")});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
            
        }




    };
    
    //Function that will be used by the borrower to repay the loan installmentally 
    const repay=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const repaymentInstallment=await p2plendingContract.getCreditInfo()
            const repaymentInstallmentAmount=repaymentInstallment[3]

            console.log(repaymentInstallmentAmount);

            
            const transactionHash=await p2plendingContract.repay({gasLimit: 100000,value:repaymentInstallmentAmount});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
            
        } catch (error) {

            console.log(error);
            throw new Error("No ethereum object.");
            
        }





    };
    //Function that will be used by the borrower to get their collateral back after loan repayment 
    const refundCollateral=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            

            const transactionHash=await p2plendingContract.refundCollateral({gasLimit: 100000});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
            
        } catch (error) {

            console.log(error);
            throw new Error("No ethereum object.");
            
        }


    };
    //Function that will be used by the borrower to withdraw extra collateral when it is defaulted 
    const refundCollateralAfterDefault=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            
            const transactionHash=await p2plendingContract.refundCollateralAfterDefault({gasLimit: 100000});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

        } catch (error) {

            console.log(error);
            throw new Error("No ethereum object.");
            
        }



    };
    //Function used by the lender to withdraw interest 
    const requestInterest=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const transactionHash=await p2plendingContract.requestInterest({gasLimit: 100000});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
            
        } catch (error) {

            console.log(error);
            throw new Error("No ethereum object.");
            
        }



    }
    //Function that will be used by the lenders to withdraw original investment 
    const refundFundDeposited=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const transactionHash=await p2plendingContract.refundFundDeposited({gasLimit: 100000});
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionHash.hash}`);

            
            
        } catch (error) {

            console.log(error);
            throw new Error("No ethereum object.");
            
        }




    };
   
   // Function that will be used to get the transaction info 
    const getTransactionInfo=async()=>{
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const avaliableTransactions=await p2plendingContract.getTransactionInfo()
            const structuredTransaction=avaliableTransactions.map((transaction)=>({
                borrower:transaction.borrower,
                requestedAmount:parseInt(transaction.requestedAmount)/(10**18),
                collateralAmount:parseInt(transaction.collateralAmount)/(10**18),
                repaymentInstallment:parseInt(transaction.repaymentInstallment)/(10**18),
                returnAmount:parseInt(transaction.returnAmount)/(10**18),
                dateLoanPaid:new Date(transaction.dateLoanPaid.toNumber()*1000).toLocaleString()


            }))
            console.log(structuredTransaction);
            setTransaction(structuredTransaction); 
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
  
        }
       



    }
    //Function that will be used to get specific variables stored in the contract
    const getCreditInfo=async()=>{

        try { 
            if (!ethereum) return alert("Please Install Metamask");
            const p2plendingContract=getEthereumContract();
            const creditInfo=p2plendingContract.getCreditInfo()
            console.log(creditInfo);


            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");

        }



    }

    //Use effect hook 
    useEffect(()=>{
        checkIfWalletIsConnected();}, [])
    return(
        <P2PLENDINGcontext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,applyForLoan,borrowersCollateral,withdraw,invest,repay,refundCollateral,refundCollateralAfterDefault,requestInterest,refundFundDeposited,getTransactionInfo,getCreditInfo,transactions,isLoading}}>
            {children}



        </P2PLENDINGcontext.Provider>




    )





}