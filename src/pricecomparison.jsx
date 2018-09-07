import React, { Component } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderItem,
  TableBody,
  TableItem,
} from 'spectacle'
import Price from './price'
import web3 from './web3'

const abi = require('./abi/dsvalue.json')

export default class PriceComparison extends Component {

  state = {
    pip: null
  }

  componentDidMount() {
    const pip = new web3.eth.Contract(abi, "0x729D19f657BD0614b4985Cf1D82531c67569197B")
    pip.methods.read().call().then(x => {
      this.setState({
        pip: web3.utils.fromWei(x)
      })
    })
    window.pip = pip
  }

  render() {
    const price = this.state.pip || 600.47
    return (
      <Table textSize={42} margin="50px 0 0">
        <TableHeader>
          <TableRow>
            <TableHeaderItem></TableHeaderItem>
            <TableHeaderItem>ETH/USD</TableHeaderItem>
            <TableHeaderItem>DAI/USD</TableHeaderItem>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableItem>Dec 17 2017</TableItem>
            <TableItem>717.71</TableItem>
            <TableItem>1</TableItem>
          </TableRow>
          <TableRow>
            <TableItem>Jan 13 2018</TableItem>
            <TableItem>1385.02</TableItem>
            <TableItem>1</TableItem>
          </TableRow>
          <TableRow>
            <TableItem>April 6 2018</TableItem>
            <TableItem>370.35</TableItem>
            <TableItem>1</TableItem>
          </TableRow>
          <TableRow>
            <TableItem>{new Date().toDateString()}</TableItem>
            <TableItem>{price}</TableItem>
            <TableItem>1</TableItem>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
