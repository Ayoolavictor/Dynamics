// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;
 // Openzeppelin contracts to improve security of the contract 
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
  //bool to ensure withdrawn variable is false when new loan is asked for
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
  // To ensure the loan is active
  modifier isActive() {
        require(active == true);
        _;
  }
  // To ensure only the borrower can use some functions
  modifier onlyBorrower() {
      require(msg.sender == borrower);
      _;
  }
  // To ensure only the lenders can use some functions
  modifier onlyLender() {
      require(lenders[msg.sender] == true);
      _;
  }
  // Indicates the requirement where the lenders can ask for interest 
  modifier canAskForInterest() {
      require(state == State.interestReturns);
      require(lendersInvestedAmount[msg.sender] > 0);
      _;
  }
  // Indicates the requirement where the lenders can invest 
  modifier canInvest() {
      require(state == State.investment);
      _;
  }
  // Indicates the requirement for borrowers to repay the loan
  modifier canRepay() {
      require(state == State.repayment);
      _;
  }
  // Indicates the requirement for when the borrower can withdraw thier collateral
  modifier canWithdrawCollateral(){
      require(state==State.collateralReturns);
      require(dateLoanPaid>block.timestamp);
      _;

  }
  // Used to indicates that the time the loan should be repaid as elapsed 
  modifier timeElapsed(){
    require(dateLoanPaid<block.timestamp);
    _;
  }
  //Used to indicate that the time the loan should be repaid has not not elapsed 
  modifier timeRunning(){
    require(dateLoanPaid>block.timestamp);
    _;

  }
  //Used to indicate when borrowers can withdraw the loan they asked for 
  modifier canWithdraw() {
      require(address(this).balance >= requestedAmount);
      require(withdrawn==false);
      _;
  }



  //struct that would store the transaction info which will be used in for frontend 
  struct TransactionStruct{
    address borrower;
    uint requestedAmount;
    uint collateralAmount;
    uint repaymentInstallment;
    uint returnAmount;
    uint dateLoanPaid;
    
  }

  //initializing the struct 
  TransactionStruct[] transactions;


   // main constrctor of the contract 
  constructor(){ }


  //This function is used to apply for loans and also it will take in important variables and initialize them
  function applyForLoan(uint _collateralAmount, uint _requestedAmount, uint _requestedNumberRepayment,uint _dateLoanPaid)public{
    require(_dateLoanPaid>block.timestamp,"Input a valid date");
    // this is to make sure the account that triggers this function is marked as the borrower
    borrower=msg.sender;
    // Initializes the amount of collateral that would be deposited by the borrower
    collateralAmount=_collateralAmount;
    //Intializes the amount that is requested by the borrower
    requestedAmount=_requestedAmount;
    // Calculates the percentage interest that would be pais by the borrower(20%)
    interest= ((requestedAmount/100)*20);
    // Intializes the number of times the borrower is able to pay the loan back
    requestedNumberRepayment=_requestedNumberRepayment;
    //Intializes the tracks the number of times left to pay the installments
    remainingRepayment=_requestedNumberRepayment;
    //Calculates the total amount that would be returned by the borrower + interest
    returnAmount =_requestedAmount.add(interest);
    //Calculated the amount of the installments that would be paid
    repaymentInstallment=returnAmount.div(requestedNumberRepayment);
    // Intializes the date that the borrower requested for the loan
    requestedDate=block.timestamp;
    //Intializes the date the borrower as set for final repayment
    dateLoanPaid=_dateLoanPaid;
    //Tracks the amount of the return amount already paid 
    repaidAmount=0;
    // Tracks the number of lenders on one loan application 
    lendersCount=0;
    // Tracks if the borrower as withdrawn the amount of money he requested fir 
    withdrawn=false;
    emit LogCreditInitialized(borrower,block.timestamp);
    active=true;
    emit LogCreditStateActiveChanged(active,block.timestamp);
    // Pushes important variables to the struct above which will make up the transaction tab on the app
    transactions.push(TransactionStruct(borrower,requestedAmount,collateralAmount,repaymentInstallment,returnAmount,dateLoanPaid));
   


  }

  // Function that will enable the borrower to deposit collateral
  function borrowersCollateral() public onlyBorrower isActive payable {
    require (msg.value>=returnAmount);
    collateralAmount = msg.value;
    emit LogBorrowerCollateralDeposited(msg.sender,msg.value,block.timestamp);
    state=State.investment;
    emit LogCreditStateChanged(state, block.timestamp);
  }
  
  // Function which which will enable the lenders to invest there crypto for the requested loan to be serviced
  function invest() public isActive canInvest payable{
    lenders[msg.sender]=true;
    lendersCount++;
    lendersInvestedAmount[msg.sender]=lendersInvestedAmount[msg.sender].add(msg.value);
    emit LogLenderInvestment(msg.sender,msg.value,block.timestamp);
  }

  // Function that enables the borrower to withdraw the requested Loan amount after the lenders have invested 
  function withdraw() public isActive onlyBorrower canWithdraw {
    state=State.repayment;
    withdrawn=true;
    emit LogCreditStateChanged(state,block.timestamp);
    payable(msg.sender).transfer(requestedAmount);
    emit LogBorrowerWithdrawal(msg.sender,requestedAmount,block.timestamp);
  }
    
  // function that will enable the borrower to repay loans installmentally 
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

  //function will enable the borrower to withdraw is collateral after loans has been repaid fully
  function refundCollateral()public isActive onlyBorrower canWithdrawCollateral{
    payable(msg.sender).transfer(collateralAmount);
    emit LogBorrowerCollateralRefunded(msg.sender,collateralAmount,block.timestamp);
    state=State.interestReturns;
    emit LogCreditStateChanged(state,block.timestamp);
  }

  //function will enable the borrower to withdraw is remaining collateral after defaulting on payment 
  function refundCollateralAfterDefault()public isActive onlyBorrower timeElapsed(){
    uint extraCredit=collateralAmount-(returnAmount-repaidAmount);
    emit LogBorrowerDefaultsOnPayment(msg.sender,extraCredit,block.timestamp);
    payable(msg.sender).transfer(extraCredit);
    emit LogBorrowerRepaymentFinished(msg.sender,block.timestamp);
    emit LogExtraBorrowerCollateralRefunded(msg.sender,extraCredit,block.timestamp);
    state=State.interestReturns;
    emit LogCreditStateChanged(state,block.timestamp);
  }

  
  //function which will enable the lenders to request for interest after loan has been paid 
  function requestInterest() public isActive onlyLender canAskForInterest{
    lenderReturnAmount=returnAmount/lendersCount;
    uint interestPerLender=interest/lendersCount;
    assert(address(this).balance>=lenderReturnAmount);
    payable(msg.sender).transfer(interestPerLender);
    emit LogLenderWithdrawal(msg.sender,interestPerLender,block.timestamp);
  }

  //function that will enable the lenders to withdraw their investment after interest has been gotten
  //which will also signify the end of the contract
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
    
    
  //getter function for getting contract variables and returning it 
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

  
  //getter function for getting the already intialized transaction struct 
  function getTransactionInfo() public view returns(TransactionStruct[] memory){
    return transactions;
  }

}



