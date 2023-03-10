import React, {useContext} from "react";
import { P2PLENDINGcontext } from "../context/P2PLENDINGcontext";
const commonStyles="min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// Main Landing page component 
const Welcome=()=>{
    const {connectWallet,currentAccount}=useContext(P2PLENDINGcontext);

    return(
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Lend  and Borrow <br/>Crypto easily!
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                     Explore the DeFi world.Lend and Borrow Crypto easily on dynamics.
                    </p>
                    {!currentAccount && (<button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5
                    bg-[#636c98] p-3 rounded-full cursor-pointer hover:bg-[#606fbe]">
                        <p className="text-white text-base font-semibold">Connect Wallet </p>
                    </button>)}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`md:rounded-tl-2xl ${commonStyles}`}>
                            Fast

                        </div>
                        <div className={commonStyles}>
                            Reliability


                        </div>
                        <div className={`md:rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                            

                        </div>
                        <div className={`md:rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                            

                        </div>
                        <div className={commonStyles}>
                            Low Fees


                        </div>
                        <div className={`md:rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                            

                        </div>



                    </div>




                </div>



            </div>



           </div>
     

    )

}

export default Welcome;