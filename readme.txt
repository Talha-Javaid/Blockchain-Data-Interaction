/********* stack used **************/

1: used web3 library to interact with polygon blockchain
2: used build in function of web3 
3: getPastLogs; to fetch transaction history logs 
4: getBlockNumber: to get the latest block 


/************* step to setup ***************/

1: download the files attached with the mail 
2: keep in a directory and open with any code editor vscode or sublime 
3: run npm install to install node_modules
4: read the instruction mentioned in "helperFunction.js" file 
5: run node transactionHistory.js


/************ Note ************/

 *** Normally web3 libraries allow to fetch data upto latest 50000 blocks in a single iterations
 *** Full node is needed to setup in order to fetch the historical data from earliest to latest 
 *** check below function "fetchTransactionHistories" to get the data of the recent 50000 blocks
 *** for full data check for 2nd function that is commit now but 
 *** there is the limitations of rpc endpoint per second and data is not available
 *** due to inavailability of full node setup light node gives you only limited data within block range

************/
