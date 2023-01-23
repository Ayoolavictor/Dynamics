import React from 'react'

const About = () => {
  return (
    <div className='w-full grid justify-items-center items-center '>
        <div className='text-white text-xl px-5 mt-10 m-20 display:inline-block font-serif tracking-wide leading-8 align-middle'>
        The purpose of the project is to provide a medium where anyone can lend their cryptocurrency
         to receive interest over time, also borrowers can take up collateralized loans 
         from the pool then pay back in installments with interest which will be shared among the lenders. 
         This creates an easier way for borrowers to access fast crypto loans which they may want to use for trading or any other transactions and also lenders can use crypto they would not be needing for sometime to generate interest.
  
            Some of the features of this app includes:<br/>

          *Lenders can deposit there crypto into the pool <br/>
          *Lenders can request for interest from the pool. <br/>
          *Borrowers can deposit collateral which value must not be less than the loan value they are requesting for <br/>
          *Borrowers can apply for credits which will be sent to their address after the lenders have voted.<br/>
          *Borrowers can lose their collateral or part of it if they default on payments

 


        </div>
        
        


    </div>
  )
}

export default About