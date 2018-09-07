import React, { Component } from 'react'
import { Heading, Text, Appear } from 'spectacle'
import Price from './price'
import web3 from './web3'

const abi = require('./abi/dsvalue.json')

class Slide1 extends Component {
  state = {
    blockNumber: 'Loading...',
    hash: 'Loading...',
    txs: 'Loading',
    pip: null,
    pep: null,
  }

  componentDidMount() {
    web3.eth.getBlock('latest').then(block => {
      this.setState({
        blockNumber: block.number,
        hash: block.hash,
        txs: block.transactions.length
      })
    })
    const pip = new web3.eth.Contract(abi, "0x729D19f657BD0614b4985Cf1D82531c67569197B")
    pip.methods.read().call().then(x => {
      this.setState({
        pip: web3.utils.fromWei(x)
      })
    })
    window.pip = pip
    const pep = new web3.eth.Contract(abi, "0x99041F808D598B782D5a3e498681C2452A31da08")
    pep.methods.read().call().then(x => {
      this.setState({
        pep: web3.utils.fromWei(x)
      })
    })
    window.pep = pep
  }

  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe((error, success) => {
      if (error) console.error(error);

      console.log('Successfully unsubscribed!');
    });
  }

  getBlockNumber = () => {
    this.subscription = web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
      if (error) console.error(error);
    }).on('data', (blockHeader) => {
      console.log(blockHeader)
      this.setState({ blockNumber: blockHeader.number })
    });
  }

  render() {
    return (
      <div>
        <Heading size={2} textColor="secondary" caps>
          This is a dapp
        </Heading>
        <Appear>
          <Heading size={2} textColor="tertiary" caps>
            (really)
          </Heading>
        </Appear>
        <Appear>
          <Text textColor="secondary">
            Latest block number: {this.state.blockNumber}
          </Text>
        </Appear>
        <Appear>
          <Text textColor="secondary">
            {this.state.hash.substr(0, 26)}...
          </Text>
        </Appear>
        <Appear>
          <Text textColor="secondary">
            {this.state.txs} txs
          </Text>
        </Appear>
        <Appear>
          <Text textColor="secondary">
            github.com/makerdao/ethba
          </Text>
        </Appear>
      </div>
    )
  }
}

export default Slide1
