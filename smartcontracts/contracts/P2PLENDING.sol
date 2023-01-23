// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract P2PLENDING is Ownable{
  // using the safeMath contract to make sure all our calculations using uint is correct
  using SafeMath for uint;
  //address of the person that asked for the loan thereby activating the credit contract 
  address borrower;
  //Amount of the token requested by the borrower.
  uint requestedAmount;
  //Amount that would be returned by the borrower including the interest
  uint returnAmount;
  //Amount repaid currently.
  uint repaidAmount;
  //Credit interest
  uint interest;
  //Number of times the credit should be repayed 
  uint requestedNumberRepayment;
  //Remaining number of repayment cycle left
  uint remainingRepayment;
  //value of each repayment installment
  uint repaymentInstallment;
  //total number of money returned to the lender 
  uint lenderReturnAmount;
  //the timestamp that the credit was requested
  uint requestedDate;
  //Date the loan should be paid
  uint dateLoanPaid;
  //Timestamp of the last repayment date
  uint lastRepaymentDate;
  //The amount of collateral deposited by the borrower
  uint collateralAmount;
  //Active state of the credit
  bool active=false;
  bool withdrawn=false;
  



  /* Stages that every credit contract gets trough.
      *   investment - During this state only investments are allowed.
      *   repayment - During this stage only repayments are allowed.
      *   interestReturns - This stage gives investors opportunity to request their returns.
      *   expired - This is the stage when the contract is finished its purpose.
      *   collateralReturns-This is the stage where the collateral of the borrowe is returned after repayment
      *   interestReturns-This is when the lenders are paid there interest and also refunded any extra fund they have deposited into the contract.
      *   expired- This signals the end of the contract 
  */

  enum State {depositing,investment,repayment,collateralReturns,interestReturns,expired}
  State state;

  //Lenders for the credit
  
  mapping(address => bool) public lenders;
  //Amount of token each investor is putting into the pool
  mapping(address=> uint)  public lendersInvestedAmount;
  //storing the number of lenders;
  uint lendersCount=0;
  //Revoke votes count
  

  // Events
  event LogCreditInitialized(address indexed _address, uint indexed timestamp);
  event LogCreditStateChanged(State indexed state, uint indexed timestamp);
  event LogCreditStateActiveChanged(bool indexed active, uint indexed timestamp);
  

  event LogBorrowerWithdrawal(address indexed _address, uint indexed _amount, uint indexed timestamp);
  event LogBorrowerRepaymentInstallment(address indexed _address, uint indexed _amount, uint indexed timestamp);
  event LogBorrowerRepaymentFinished(address indexed _address, uint indexed timestamp);
  event LogBorrowerCollateralDeposited(address indexed _address,uint indexed amount,uint indexed timestamp);
  event LogBorrowerDefaultsOnPayment(address indexed _address,uint indexed amount,uint indexed timestamp);
  event LogBorrowerCollateralRefunded(address indexed _address,uint indexed _amount,uint indexed timestamp);
  event LogExtraBorrowerCollateralRefunded(address indexed _address,uint indexed _amount,uint indexed timestamp);
  event LogLenderInvestment(address indexed _address, uint indexed _amount, uint indexed timestamp);
  event LogLenderWithdrawal(address indexed _address, uint indexed _amount, uint indexed timestamp);
  event LogLenderRefunded(address indexed _address, uint indexed _amount, uint indexed timestamp);
  

  //Modifiers needed 
  modifier isActive() {
        require(active == true);
        _;
    }

  modifier onlyBorrower() {
      require(msg.sender == borrower);
      _;
  }

  modifier onlyLender() {
      require(lenders[msg.sender] == true);
      _;
  }

  modifier canAskForInterest() {
      require(state == State.interestReturns);
      require(lendersInvestedAmount[msg.sender] > 0);
      _;
  }

  modifier canInvest() {
      require(state == State.investment);
      _;
  }

  modifier canRepay() {
      require(state == State.repayment);
      _;
  }
  modifier canWithdrawCollateral(){
      require(state==State.collateralReturns);
      require(dateLoanPaid>block.timestamp);
      _;

  }
  modifier timeElapsed(){
    require(dateLoanPaid<block.timestamp);
    _;


  }
  modifier timeRunning(){
    require(dateLoanPaid>block.timestamp);
    _;


  }

  modifier canWithdraw() {
      require(address(this).balance >= requestedAmount);
      require(withdrawn==false);
      _;
  }
  
  struct TransactionStruct{
    address borrower;
    uint requestedAmount;
    uint collateralAmount;
    uint repaymentInstallment;
    uint returnAmount;
    uint dateLoanPaid;
    
  }
  TransactionStruct[] transactions;

  constructor(){ }
  function applyForLoan(uint _collateralAmount, uint _requestedAmount, uint _requestedNumberRepayment,uint _dateLoanPaid)public{
    borrower=msg.sender;
    collateralAmount=_collateralAmount;
    requestedAmount=_requestedAmount;
    interest= ((requestedAmount/100)*20);
    requestedNumberRepayment=_requestedNumberRepayment;
    remainingRepayment=_requestedNumberRepayment;
    returnAmount =_requestedAmount.add(interest);
    repaymentInstallment=returnAmount.div(requestedNumberRepayment);
    requestedDate=block.timestamp;
    dateLoanPaid=_dateLoanPaid;
    repaidAmount=0;
    lendersCount=0;
    withdrawn=false;
    emit LogCreditInitialized(borrower,block.timestamp);
    active=true;
    emit LogCreditStateActiveChanged(active,block.timestamp);
    transactions.push(TransactionStruct(borrower,requestedAmount,collateralAmount,repaymentInstallment,returnAmount,dateLoanPaid));
   


  }

  function borrowersCollateral() public onlyBorrower isActive payable {
    require (msg.value>=returnAmount);
    collateralAmount = msg.value;
   
    emit LogBorrowerCollateralDeposited(msg.sender,msg.value,block.timestamp);

    state=State.investment;

    emit LogCreditStateChanged(state, block.timestamp);
    

  }
  
  function invest() public isActive canInvest payable{
    require (msg.value>1000000000000000);
    
  
   

    lenders[msg.sender]=true;
    lendersCount++;

    lendersInvestedAmount[msg.sender]=lendersInvestedAmount[msg.sender].add(msg.value);
    emit LogLenderInvestment(msg.sender,msg.value,block.timestamp);
  
    


  }
  function withdraw() public isActive onlyBorrower canWithdraw {
    
    state=State.repayment;
    withdrawn=true;
    emit LogCreditStateChanged(state,block.timestamp);
    payable(msg.sender).transfer(requestedAmount);
    emit LogBorrowerWithdrawal(msg.sender,requestedAmount,block.timestamp);
    
   }
    

  function repay() public onlyBorrower isActive canRepay timeRunning payable{
    require(remainingRepayment>0);
    assert(msg.value<=returnAmount);

    require(msg.value >= repaymentInstallment);
    repaidAmount=repaidAmount+msg.value;

    remainingRepayment--;
    
    lastRepaymentDate=block.timestamp;

    
    emit LogBorrowerRepaymentInstallment(msg.sender,msg.value,block.timestamp);

    if(repaidAmount==returnAmount){

        emit LogBorrowerRepaymentFinished(msg.sender,block.timestamp);
        state=State.collateralReturns;

        emit LogCreditStateChanged(state,block.timestamp);

    }
   
  }
  function refundCollateral()public isActive onlyBorrower canWithdrawCollateral{
    payable(msg.sender).transfer(collateralAmount);
    emit LogBorrowerCollateralRefunded(msg.sender,collateralAmount,block.timestamp);
    state=State.interestReturns;
    emit LogCreditStateChanged(state,block.timestamp);
    

  }


  function refundCollateralAfterDefault()public isActive onlyBorrower timeElapsed(){
    uint extraCredit=collateralAmount-(returnAmount-repaidAmount);
    emit LogBorrowerDefaultsOnPayment(msg.sender,extraCredit,block.timestamp);
    payable(msg.sender).transfer(extraCredit);
    emit LogBorrowerRepaymentFinished(msg.sender,block.timestamp);
    emit LogExtraBorrowerCollateralRefunded(msg.sender,extraCredit,block.timestamp);
    state=State.interestReturns;
    emit LogCreditStateChanged(state,block.timestamp);
    

  }

  

  function requestInterest() public isActive onlyLender canAskForInterest{

    lenderReturnAmount=returnAmount/lendersCount;
    uint interestPerLender=interest/lendersCount;

    assert(address(this).balance>=lenderReturnAmount);
    payable(msg.sender).transfer(interestPerLender);
    

    emit LogLenderWithdrawal(msg.sender,interestPerLender,block.timestamp);
    

  }
  function refundFundDeposited()public isActive onlyLender canAskForInterest{
    payable(msg.sender).transfer(lendersInvestedAmount[msg.sender]);
    lendersInvestedAmount[msg.sender]=0;

    emit LogLenderRefunded(msg.sender,lendersInvestedAmount[msg.sender],block.timestamp);

    if(address(this).balance==0){


        active=false;
        emit LogCreditStateActiveChanged(active,block.timestamp);

        state=State.expired;

        emit LogCreditStateChanged(state, block.timestamp);

    }
  


  }
    
    

  function getCreditInfo() public view returns(address, uint,uint, uint, uint, uint, uint, State, bool, uint){
    return(
        borrower,
        requestedAmount,
        collateralAmount,
        repaymentInstallment,
        remainingRepayment,
        repaidAmount,
        returnAmount,
        state,
        active,
        address(this).balance);
        

   }

  
  function getTransactionInfo() public view returns(TransactionStruct[] memory){
    return transactions;


  }
   

   


  

 

 


}



