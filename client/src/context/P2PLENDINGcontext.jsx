import React, {useEffect,useState} from "react";
import {ethers} from "ethers";
import{contractABI,contractAddress} from "../utils/constants";

export const P2PLENDINGcontext=React.createContext();
const {ethereum} =window;

const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const p2plendingContract=new ethers.Contract(contractAddress,contractABI,signer);
    
    return p2plendingContract;
}

export const P2PLENDINGProvider=({children})=>{
    const [currentAccount,setCurrentAccount] = useState('')
    const[formData, setFormData]=useState({requestedAmount:"",collateralAmount:"",requestedNumberRepayment:"",dateLoanPaid:"",lendersdeposit:""});
    const [isLoading, setIsLoading] = useState(false);
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}));
    };
    const [transactions, setTransaction] = useState([])

    
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

    useEffect(()=>{
        checkIfWalletIsConnected();}, [])
    return(
        <P2PLENDINGcontext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,applyForLoan,borrowersCollateral,withdraw,invest,repay,refundCollateral,refundCollateralAfterDefault,requestInterest,refundFundDeposited,getTransactionInfo,getCreditInfo,transactions,isLoading}}>
            {children}



        </P2PLENDINGcontext.Provider>




    )





}