const { Web3 } = require('web3');
const web3 = new Web3('https://polygon-bor-rpc.publicnode.com');
const contractAddress = '0x7C58D971A5dAbd46BC85e81fDAE87b511431452E';
const CONTRACT_CREATOR_WALLET = "0xeD8dBA880d44CF954769474124141325c6430fd3"


/************

 *** Normally web3 libraries allow to fetch data upto latest 50000 blocks in a single iterations
 *** Full node is needed to setup in order to fetch the historical data from earliest to latest 
 *** check below function "fetchTransactionHistories" to get the data of the recent 50000 blocks
 *** for full data check for 2nd function that is commit now but 
 *** there is the limitations of rpc endpoint per second and data is not available
 *** due to inavailability of full node setup light node gives you only limited data within block range

************/

// Function to fetch transaction histories of EAT holders
async function fetchTransactionHistories() {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const fromBlock = Math.max(0, Number(latestBlockNumber) - 49999); // Adjust the block range here
    const toBlock = 'latest';
  
    const transactions = await web3.eth.getPastLogs({
      fromBlock: fromBlock,
      toBlock: toBlock,
      address: contractAddress,
    });
  
    return transactions;
  }

// async function fetchTransactionHistories() {
//     const latestBlockNumber = await web3.eth.getBlockNumber();
//     console.log("Latest block number:", latestBlockNumber);

//     const batchSize = 49999;
//     let fromBlock = Number(latestBlockNumber);
//     let transactions = [];

//     while (fromBlock >= 0) {
//         const toBlock = Math.max(0, fromBlock - batchSize + 1);
//         console.log(`Fetching transactions for blocks ${fromBlock} to ${toBlock}`);

//         const batchTransactions = await web3.eth.getPastLogs({
//             fromBlock: toBlock,
//             toBlock: fromBlock,
//             address: contractAddress,
//         });

//         transactions = transactions.concat(batchTransactions);

//         if (toBlock === 0) {
//             break;
//         }
//         fromBlock = toBlock - 1;
//     }

//     return transactions;
// }


// Function to analyze transactions and identify top 5 most active wallets
async function analyzeTransactions(transactions) {
  const walletTransactions = {};
  
  transactions.forEach(transaction => {
    if (transaction.from !== CONTRACT_CREATOR_WALLET) {
      if (!walletTransactions[transaction.from]) {
        walletTransactions[transaction.from] = 1;
      } else {
        walletTransactions[transaction.from]++;
      }
    }
      if (!walletTransactions[transaction.to]) {
      walletTransactions[transaction.to] = 1;
    } else {
      walletTransactions[transaction.to]++;
    }
  });
  
  const sortedWallets = Object.keys(walletTransactions).sort((a, b) => walletTransactions[b] - walletTransactions[a]);
  return sortedWallets.slice(0, 5).map(wallet => ({ wallet, transactionCount: walletTransactions[wallet] }));
}

module.exports = {
    fetchTransactionHistories,
    analyzeTransactions
}