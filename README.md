# Ethereum Data TX Builder 
Script to build raw Ethereum transactions with data in the payload, sign, and broadcast with BlockCypher. Used to anchor hashes of data / files into the Ethereum blockchain.

## Running

```
git clone https://github.com/tomkysar/Ethereum-Data-TX-Builder
cd Ethereum-Data-TX-Builder
npm insall
npm start
```

## Example Anchor 

```
Sending sending 0.0001 ETH to 0xCF7351D79cB8E8edefF2FF95aC976447238972C2E
With data: 9dbd72de6836ce7c05c0c065b4sdfjas6d57s8999as4e8efb03cb58d81

Getting gasPrice....
Building....
Signing....
Broadcasting....
Success!

{ tx: 
  { 
    block_height: -1,
    block_index: 0,
    hash: '5b4ab888643f305b1547b96095b85c823308a8f780e5fbef212d10398d0c7759',
    addresses: 
      [ '39b2ff47d34f3b348783f1255dc41d53d619f21ffa',
        'cf7351d79cb8e8edeff2ff9545453453423f972c2e' ],
    total: 100000000000000,
    fees: 736840843023600,
    size: 121,
    gas_limit: 25200,
    gas_price: 29239715993,
    relayed_by: '73.93.142.205',
    received: '2016-09-09T21:44:21.733917268Z',
    ver: 0,
    double_spend: false,
    vin_sz: 1,
    vout_sz: 1,
    confirmations: 0,
    inputs: [ [Object] ],
    outputs: [ [Object] ] 
  } 
}
```

## Configure 

Senders address (private & public key), recievers address (public key), and hash.

```javascript
var privateKey = new Buffer('', 'hex')
var publicKey = ''
var recievingAddress = ''
var hash = ''
var blockcypherKey = ''
```
