// Dependencies
var express = require('express')
var app = express()
var Tx = require('ethereumjs-tx')
var request = require('request');

// Init 
app.set('port', (process.env.PORT || 5002))
app.use(express.static(__dirname + '/public'))

// 
// Configureable credentials
//
// privateKey and publicKey are the senders addresses
// recievingAddress is the the secondary address
// hash is the SHA-256 hash you want to anchor 
//
var privateKey = new Buffer('COMPLETE', 'hex')
var publicKey = 'COMPLETE'
var recievingAddress = 'COMPLETE'
var hash = 'COMPLETE'
var blockcypherKey = 'COMPLETE'

// Get the current TX count of the sending address
request({
  url: 'https://api.blockcypher.com/v1/eth/main/addrs/' + publicKey + '/balance',
  method: 'GET'
}, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    // Parse response (current accout total tx's)
    var getNonce = JSON.parse(body)

    // Confirm the transaction in the console
    console.log("Sending sending 0.0001 ETH to 0x" + recievingAddress)
    console.log("With data: " + hash)
    console.log("Getting gasPrice....")

    // Get the current gasPrice of the network
    request({
      url: 'https://api.blockcypher.com/v1/eth/main',
      method: 'GET'
    }, function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        // Parse response (ETH network stats)
        var getGasPrice = JSON.parse(body)

        console.log("Building....")
        // Intigers of gasLimit & gasPrice (20% higher for priority)
        // 21000 is the default gasLimit network wide currently
        var gasLimit = 21000 * 1.2;
        var gasPrice = Math.round(getGasPrice.high_gas_price * 1.2)

        // Convert to hex for rawTx
        var gasPriceHex = gasPrice.toString(16)
        var gasLimitHex = gasLimit.toString(16)

        // Build the raw transaction as hex 
        // Subtract total TX address has recieved
        var rawTx = {
          nonce: parseInt(getNonce.final_n_tx) - 1,
          gasPrice: '0x' + gasPriceHex,
          gasLimit: '0x' + gasLimitHex,
          to: '0x' + recievingAddress,
          value: '0x5af3107a4000', // 0.0001 ETH (Hard set)
          data: '0x' + hash
        }

        // Sign and seralize the raw transaction
        console.log("Signing....")
        var tx = new Tx(rawTx)
        tx.sign(privateKey)
        var serTx = tx.serialize().toString('hex')

        // Broadcast the transaction with BlockCypher
        blockCypherBroadcast(serTx)
      }
    })
  }
});

// Push the serialized transaction to the network - API key in URL
function blockCypherBroadcast(serTx) {
  console.log("Broadcasting....")
  request({
    url: 'https://api.blockcypher.com/v1/eth/main/txs/push?token=' + blockcypherKey,
    method: 'POST',
    json: {
      tx: serTx
    }
  }, function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log("Success!")
      console.log(body);
    }
  });
}