const {fetchTransactionHistories, analyzeTransactions } = require("./helperFunctions")

async function topAccounts() {
    const transactions = await fetchTransactionHistories();
    const topWallets = await analyzeTransactions(transactions);
    
    topWallets.forEach((wallet, index) => {
      console.log(`${index + 1}= Transaction Count: ${wallet.transactionCount}`);
    });
  }  
  
  topAccounts();