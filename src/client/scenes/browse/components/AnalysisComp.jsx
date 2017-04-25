/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import ApiCall from 'ApiCall'
import axios from 'axios'
import fx from 'money'
import update from 'immutability-helper'
import './analysisComp.local.scss'

class AnalysisComp extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      rates: {},
      newCurrency: '',
      changeArray: [],
      sum: ''
    }
    const self = this
    self.componentWillMount = this.componentWillMount.bind(this)
    self.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    self.changeCurrency = this.changeCurrency.bind(this)
  }

  componentWillMount () {
    ApiCall.getFile().then(data => {
      console.log(data)
      this.setState({
        data: data
      })
    })

    axios.get('http://api.fixer.io/latest').then((res) => {
      this.setState({rates: res.data.rates})
    })
  }

  componentWillReceiveProps () {
    ApiCall.getFile().then(data => {
      console.log(data)
      this.setState({
        data: data
      })
    })
  }

  changeCurrency (event) {
    console.log(event)

    fx.base = 'EUR'
    fx.rates = {
      'EUR': 1,
      'CAD': this.state.rates.CAD,
      'CHF': this.state.rates.CHF,
      'GBP': this.state.rates.GBP,
      'JPY': this.state.rates.JPY,
      'USD': this.state.rates.USD
    }
    this.setState({
      newCurrency: event.target.value
    }, () => {
      var changeArray = []
      this.state.data.map((dataState) => {
        var amount = dataState.amount
        var currency = dataState.currency
        var newCurrency = this.state.newCurrency
        var newAmount = fx.convert(amount, {from: currency, to: newCurrency})
        var change = update(dataState, {
          $merge: {amount: newAmount, currency: newCurrency}
        })
        changeArray.push(change)

        /* newAmounts.push(newAmount) */
      })
      console.log(changeArray)

      this.setState({
        changeArray: changeArray
      })
    })
  }


  render (): React.Element<any> {
    return (
      <div className="container" styleName="container">

        <table className="table table-striped table-bordered container">
          <thead>
            <tr>
              <th>Date</th>
              <th>Currency</th>
              <th>Amount</th>

            </tr>
          </thead>
          <tbody>
            {this.state.data.map(row => {
              return (
                <tr key={row._id}>
                  <td styleName="rowDate">{row.date}</td>
                  <td><input type="text" value={row.currency} disabled /></td>
                  <td><input type="text" value={row.amount} disabled /></td>
                </tr>
              )
            })}

          </tbody>
        </table>
        <h3>Currency Switcher</h3>
        <select onChange={this.changeCurrency} className="btn btn-primary btn-lg btn-block custom-select">
          <option defaultValue value="EUR">European Euro (EUR)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="CHF">Swiss Franc (CHF)</option>
          <option value="GBP">Pound Sterling (GBP)</option>
          <option value="JPY">Japanese Yen (JPY)</option>
          <option value="USD">US Dollar (USD)</option>
        </select>

        <table className="table table-striped container">
          <thead>
            <tr>
              <th>Date</th>
              <th>New Currency</th>
              <th>New Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.changeArray.map(row => {
              return (
                <tr key={row._id}>
                  <td styleName="rowDate">{row.date}</td>
                  <td><input type="text" value={row.currency} disabled /></td>
                  <td><input type="text" value={Math.round((row.amount) * 100) / 100} disabled /></td>
                </tr>
              )
            })}
            <tr>
              <th scope="row">SUM</th>
              <td />
              <td styleName="sum">
                <span>
                  {this.state.changeArray.reduce((sum, number) => {
                    return Math.round((sum + number.amount) * 100) / 100
                  }, 0)}
                </span>
              </td>
            </tr>

          </tbody>
        </table>






      </div>
    )
  }
}

export default AnalysisComp


{/*<td key={row._id}>
  {this.state.data.map(row => {
    return (
      <input type="text" value={row.currency} disabled /></td>
    )
  })}
</td>*/}



/*  var sum = this.state.changeArray.reduce((sum, number) => {
    console.log(sum)
    return sum + number.amount
  }, 0)
*/

/*
, () => {
      var sum = this.state.changeArray.reduce((sum, number) => {
        return sum + number.amount
      }, 0)
      console.log("Sum", sum)
      this.setState({
        sum: sum
      })
    }*/
