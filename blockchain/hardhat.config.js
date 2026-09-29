require('@nomicfoundation/hardhat-toolbox');require('dotenv').config();
module.exports={solidity:'0.8.24',networks:{hardhat:{},mst:{url:process.env.MST_RPC_URL||'http://127.0.0.1:8545',chainId:process.env.MST_CHAIN_ID?Number(process.env.MST_CHAIN_ID):31337,accounts:process.env.DEPLOYER_PRIVATE_KEY?[process.env.DEPLOYER_PRIVATE_KEY]:[]}}};
