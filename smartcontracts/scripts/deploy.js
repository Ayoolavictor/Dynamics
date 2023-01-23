const main=async() =>{
  const P2PLENDING=await hre.ethers.getContractFactory("P2PLENDING");
  const p2PLENDING=await P2PLENDING.deploy();

  await p2PLENDING.deployed();
  console.log("P2PLENDING deployed to: ",p2PLENDING.address);

  
}


const runMain=async()=>{
  try {
    await main();
    process.exit(0);
    
  } catch (error) {
    console.error(error);
    process.exit(1);
    
  }
}
runMain();
