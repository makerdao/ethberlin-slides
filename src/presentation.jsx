// Import React
import React from 'react';
import web3 from './web3'
import web3infura from './web3infura'

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Appear,
  Magic,
  Layout,
  Fill,
  Link,
  Image,
} from 'spectacle'

import Slide1 from './slide1'
import PriceComparison from './pricecomparison'

import daiLogo from './images/dai logo.png'
import makerLogo from './images/maker logo.png'
import maker from './images/maker logo with text.png'
import cdp1 from './images/cdp1.png'
import stableFund from './images/maker and stable fund.png'

// Import theme
import createTheme from 'spectacle/lib/themes/default'

// Require CSS
require('normalize.css')

const theme = createTheme(
  {
    primary: '#1F2022',
    secondary: 'white',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
)

export default class Presentation extends React.Component {
  state = {
    o1: "220.59",
    o2: "220.8",
    o3: "221.1",
    med: 0,
    sign1: "",
    sign2: "",
    sign3: "",
    recover1: "",
    recover2: "",
    recover3: "",
    ethMedianizer: 0,
    accounts: []
  }

  componentDidMount() {
    web3.eth.getAccounts().then(accounts => {
      this.setState({accounts})
    })
    web3infura.eth.call({
      to: '0x729D19f657BD0614b4985Cf1D82531c67569197B',
      data: '0x57de26a4'
    }).then(x => {
      var ethMedianizer = web3.utils.fromWei(x)
      this.setState({ethMedianizer})
    })
  }

  grabOraclePrices = (e) => {
    e.preventDefault()
    const o1 = this.o1.value
    const o2 = this.o2.value
    const o3 = this.o3.value

    var med = [o1, o2, o3]
    med = med.sort((a, b) => a - b)
    console.log(med)
    this.setState({
      o1, o2, o3, med: med[1]
    })
  }

  sign = async (e) => {
    e.preventDefault()
    const o1 = web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(this.state.o1))
    console.log(o1)
    const o2 = web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(this.state.o2))
    console.log(o2)
    const o3 = web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(this.state.o3))
    console.log(o3)
    const sign1 = await web3.eth.personal.sign(o1, this.state.accounts[0], '')
    console.log(sign1)
    const sign2 = await web3.eth.personal.sign(o2, this.state.accounts[1], '')
    console.log(sign2)
    const sign3 = await web3.eth.personal.sign(o3, this.state.accounts[2], '')
    console.log(sign3)
    const recover1 = web3.utils.toChecksumAddress(await web3.eth.personal.ecRecover(o1, sign1))
    console.log(recover1)
    const recover2 = web3.utils.toChecksumAddress(await web3.eth.personal.ecRecover(o2, sign2))
    console.log(recover2)
    const recover3 = web3.utils.toChecksumAddress(await web3.eth.personal.ecRecover(o3, sign3))
    console.log(recover3)
    this.setState({
      sign1, sign2, sign3, recover1, recover2, recover3
    })
  }

  render() {
    return (
      <Deck
        transition={['fade']}
        transitionDuration={500}
        theme={theme}
        progress="none"
      >
        <Slide>
          <Heading size={1} lineHeight={1} textColor="secondary">
            Price oracles
          </Heading>
          <Heading margin="100px 0 0" textColor="tertiary" size={4} bold>
            + signed messages on & off-chain
          </Heading>
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            Mariano Conti
          </Heading>
          <Heading margin="100px 0 0" textColor="tertiary" size={4} bold>
            Head of Oracles
          </Heading>
          <Heading margin="100px 0 0" textColor="secondary" size={4} bold>
            MakerDAO
          </Heading>
        </Slide>
        <Slide>
          <Heading>
            What is an Oracle?
          </Heading>
          <Heading margin="100px 0 0" textColor="secondary" size={4} bold>
            (in the context of a blockchain)
          </Heading>
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            I need three ETH/USD prices
          </Heading>
          <br />
          <form onSubmit={this.grabOraclePrices}>
          <div>
            <p>
            Oracle 1: <input type='text' defaultValue={this.state.o1} ref={(input) => this.o1 = input} style={{textAlign: 'center'}} />
            </p>
          </div>
          <div>
            <p>
            Oracle 2: <input type='text' defaultValue={this.state.o2} ref={(input) => this.o2 = input} style={{textAlign: 'center'}} />
            </p>
          </div>
          <div>
            <p>
            Oracle 3: <input type='text' defaultValue={this.state.o3} ref={(input) => this.o3 = input} style={{textAlign: 'center'}} />
            </p>
          </div>
          <input type="submit" style={{visible: 'false'}} />
          </form>
        </Slide>
        <Slide>
        <Heading textColor="tertiary" size={5} bold>
        MakerDAO's official ETH/USD price feed
          </Heading>
          <p>0x729D19f657BD0614b4985Cf1D82531c67569197B</p>
          <p>
            {this.state.ethMedianizer} ETH/USD
          </p>
          <Heading textColor="tertiary" size={5} bold>
          Audience
          </Heading>
          <p>
            {this.state.med} ETH/USD
          </p>
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            Transforming to Wei...
          </Heading>
          <br />
          <div>
            <p>
            {web3.utils.toWei(this.state.o1)}
            </p>
          </div>
          <div>
            <p>
            {web3.utils.toWei(this.state.o2)}
            </p>
          </div>
          <div>
            <p>
            {web3.utils.toWei(this.state.o3)}
            </p>
          </div>
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            ...and to uint256
          </Heading>
          <br />
          <div>
            <p style={{wordWrap: 'break-word'}}>
            {web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(this.state.o1))}
            </p>
          </div>
          <div>
            <p style={{wordWrap: 'break-word'}}>
            {web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(this.state.o2))}
            </p>
          </div>
          <div>
            <p style={{wordWrap: 'break-word'}}>
            {web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(this.state.o3))}
            </p>
          </div>
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            Say we have these 3 Ethereum accounts
          </Heading>
          <div>
            <p>
              {this.state.accounts[0]}
            </p>
          </div>
          <div>
            <p>
              {this.state.accounts[1]}
            </p>
          </div>
          <div>
            <p>
              {this.state.accounts[2]}
            </p>
          </div>
          <Heading textColor="tertiary" size={4} bold>
            and we sign these values as Ethereum messages
          </Heading>
        </Slide>
        <Slide>
          <form onSubmit={this.sign}>
            <input type='submit' value="Sign!" />
          </form>
          <div>
            <p style={{wordWrap: 'break-word'}}>
            {this.state.sign1}
            </p>
          </div>
          <div>
            <p style={{wordWrap: 'break-word'}}>
            {this.state.sign2}
            </p>
          </div>
          <div>
            <p style={{wordWrap: 'break-word'}}>
            {this.state.sign3}
            </p>
          </div>
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            Recovering the first account
          </Heading>
          <p>
            Price: {this.state.o1}
          </p>

          <p>
            Original: {this.state.accounts[0]}
          </p>
          <p>
            Recovered: {this.state.recover1}
          </p>
          {this.state.accounts[0] === this.state.recover1 &&
            <p style={{color: 'green'}}>
              <b>MATCH!</b>
            </p>
          }
          {this.state.accounts[0] !== this.state.recover1 &&
            <p>
              No match :(
            </p>
          }
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            ...and the second...
          </Heading>
          <p>
            Price: {this.state.o2}
          </p>

          <p>
            Original: {this.state.accounts[1]}
          </p>
          <p>
            Recovered: {this.state.recover2}
          </p>
          {this.state.accounts[1] === this.state.recover2 &&
            <p style={{color: 'green'}}>
              <b>MATCH!</b>
            </p>
          }
          {this.state.accounts[1] !== this.state.recover2 &&
            <p>
              No match :(
            </p>
          }
        </Slide>
        <Slide>
          <Heading textColor="tertiary" size={4} bold>
            ...finally the third.
          </Heading>
          <p>
            Price: {this.state.o3}
          </p>

          <p>
            Original: {this.state.accounts[2]}
          </p>
          <p>
            Recovered: {this.state.recover3}
          </p>
          {this.state.accounts[2] === this.state.recover3 &&
            <p style={{color: 'green'}}>
              <b>MATCH!</b>
            </p>
          }
          {this.state.accounts[2] !== this.state.recover3 &&
            <p>
              No match :(
            </p>
          }
        </Slide>
        <Slide>
          <Heading size={1} lineHeight={1.5} textColor="secondary" fit>
            How did that work?
          </Heading>
        </Slide>



        <Slide>
          <Image src={daiLogo} height="350px" />
          <Heading size={4} lineHeight={1.3} textColor="secondary">
            Imagine the gold standard but with any asset
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} lineHeight={1.3} textColor="secondary">
            Two types of users
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="tertiary">
            Stability Seekers
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="secondary">
            vs
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="tertiary">
            Risk Seekers
          </Heading>
        </Slide>
        <Slide>
          <Heading size={3} lineHeight={1} textColor="secondary" fit>
            Collateralized Debt Position
          </Heading>
          <Heading size={3} lineHeight={1} textColor="tertiary">
            (CDP)
          </Heading>
          <List>
            <ListItem>Borrow Dai by locking up collateral</ListItem>
            <ListItem>Repay Dai + fee to retrieve collateral</ListItem>
          </List>
          <Image src={cdp1} height="420px" />
        </Slide>
        <Slide>
          <Heading size={3} lineHeight={1.3} textColor="secondary">
            Global Decentralized Credit System
          </Heading>
          <Image src={makerLogo} height="500px" />
        </Slide>
        <Slide>
          <Image src={daiLogo} height="250px" />
          <Heading size={2} lineHeight={1.3} textColor="secondary">
            Dai time Story #1
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="tertiary">
            Getting paid in Dai
          </Heading>
        </Slide>
        <Slide>
          <Image src={daiLogo} height="250px" />
          <Heading size={2} lineHeight={1.3} textColor="secondary">
            Dai time Story #2
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="tertiary">
            Buying a car
          </Heading>
        </Slide>
        <Slide>
          <Image src={daiLogo} height="250px" />
          <Heading size={2} lineHeight={1.3} textColor="secondary">
            Dai time Story #3
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="tertiary">
            Going full in on ETH
          </Heading>
        </Slide>
        <Slide>
          <Image src={daiLogo} height="250px" />
          <Heading size={2} lineHeight={1.3} textColor="secondary">
            Multi-collateral Dai
          </Heading>
          <Heading size={3} lineHeight={1.8} textColor="tertiary">
            Coming soon!
          </Heading>
        </Slide>
        <Slide>
          <Heading textColor="secondary">
            Join our community
          </Heading>
          <Image src={makerLogo} width="200px" />
          <Text margin="20px 0 0" textColor="tertiary" bold>
            makerdao.com
          </Text>
          <Text margin="20px 0 0" textColor="tertiary" bold>
            chat.makerdao.com
          </Text>
          <Text margin="20px 0 0" textColor="tertiary" bold>
            /r/MakerDAO
          </Text>
          <Text margin="20px 0 0" textColor="tertiary" bold>
            @MakerDAO
          </Text>
        </Slide>
        <Slide>
          <Heading size={1} lineHeight={1.5} textColor="secondary" fit>
            Bounties!
          </Heading>
          <Text textColor="tertiary" bold>
            Up to 5 MKR will be awarded to projects using Dai and/or CDPs
          </Text>
        </Slide>
        <Slide>
          <Heading size={2} lineHeight={1.3} textColor="secondary" fit>
            Hackathon Project Ideas
          </Heading>
          <List>
            <ListItem>Design an interface that distills out the complexity of the dai frontend to empower a specific use case of the platform.</ListItem>
            <ListItem>Create a frontend for decentralized ETH exposure using CDP’s.</ListItem>
            <ListItem>Build a slick wallet for sending and storing Dai.</ListItem>
            <ListItem>Build a frontend for loan mechanics.</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={1} lineHeight={1.5} textColor="secondary">
            Thank you :)
          </Heading>
          <Heading size={1} lineHeight={1.5} textColor="tertiary">
            Questions?
          </Heading>
          <Text textColor="secondary" bold>
            mariano@makerdao.com
          </Text>
          <Text textColor="secondary" bold>
            Twitter: @nanexcool
          </Text>
          <Text textColor="secondary" bold>
            chat.makerdao.com: @mariano.conti
          </Text>
          <Text textColor="tertiary">
            This dappresentation available at
          </Text>
          <Text textColor="tertiary" bold>
            https://github.com/makerdao/ethberlin
          </Text>
        </Slide>
      </Deck>
    );
  }
}
