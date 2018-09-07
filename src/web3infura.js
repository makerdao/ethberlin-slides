import Web3 from 'web3'

//const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/_ws'))
const web3infura = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'))
//const web3 = new Web3(window.web3.currentProvider)
//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

export default web3infura
