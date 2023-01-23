//https://eth-goerli.g.alchemy.com/v2/E18ZHU5Dq8LIOAglKNVD9_ve4-ur9-OC

require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

module.exports={
    solidity:"0.8.0",
    networks:{
        goerli:{
            url:process.env.Api_key,
            accounts:[process.env.Secret_key],
           
        }

    }

}
