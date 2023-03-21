# DYNAMICS
## Lending and saving DApp built on ethereum using solidity and react.
<br>

## Project Description <br>
<p>This DApp is used to borrow and lend cryptocurrencies for a short time, 
the frontend is built in a way to make sure anyone can use the product for fast loans. </p
<p> Borrowers would be able to deposit collateral and request for loans easily, they can pay in installments and withdraw their collateral after
repayment is made.</p>
<p>Lenders can also invest there crypto, then request for interest easily. There is also a feature where lenders can get there interest even if the borrower defaults on
payment</p> <br>

## Project Snapshot <br>
<img src="client/images/landingpage.png" width="400" height="200"> <br> <br>

## Project Website Link <br>

<p>https://dynamics-bxqt.vercel.app/ </p> <br>

## Verified Goerli Deployed Contract <br>

<p>https://goerli.etherscan.io/address/0x962D28961D2D9b57fCe5256C37aFBD81f1a07219#code</p> <br>

## Acknowledgments <br>

<li>Milen Radkov - milenradkov@me.com </li>
<li>https://www.jsmastery.pro/ </li>  <br>

## Project Author <br>
<p>Ayoola Victor - ayoolavictor415@gmail.com </p> <br>

## How to install/ Run the product <br>

<p>1. Navigate to the client folder and install the needed dependencies using npm install  </p>
<p>2. Navigate the smart contract folder, compile and deploy the smart contracts using hardhat compile </p>
<p>3. Deploy contracts using npx hardhar run scripts/deploy.js --network goerli </p>
<p>4. Navigate back to the client app and use npm run dev to run the react app </p>
<p>5. Make sure you get an Api key from Alchemy or Quicknode and also input a contract address in the hardhat.config.js file </p>
<p>6. This projects is live on vercel and can be accessed there without installing locally </p>
<p>7. The Navigations are APPLY FOR LOAN(Borrower) -> DEPOSIT COLLATERAL(Borrower) -> DEPOSIT LENDING AMOUNT(lender)-> WITHDRAW LOAN(borrower) -> PAY BACK LOAN(borrower) -> WITHDRAW COLLATERAL (borrower) -> WITHDRAW INTEREST (lender) -> WITHDRAW FUNDED AMOUNT(lender) </p>
<p>8. If the borrower defaults on the loan the borrower would be able to withdraw is remaining collateral when the amout owed has been deducted through the WITHDRAW AFTER DEFAULT BUTTON(borrower) and the whole process continues </P> <br>

## License <br>
<p> MIT </p>
<p> GRANDIDA </p>







