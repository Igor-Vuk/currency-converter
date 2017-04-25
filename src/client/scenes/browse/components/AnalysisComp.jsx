/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import ApiCall from 'ApiCall'
import fx from 'money'
import update from 'immutability-helper'
import './analysisComp.local.scss'

class AnalysisComp extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      changeData: [],
      rates: {},
      newCurrency: '',
      sum: ''
    }
    const self = this
    self.componentWillMount = this.componentWillMount.bind(this)
    self.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    self.changeCurrency = this.changeCurrency.bind(this)
  }

  /* make api request to fetch data from mongodb on first render */
  componentWillMount () {
    ApiCall.getFile().then(data => {
      this.setState({
        data
      })
    })
    // make api request to get the currents rates
    ApiCall.getRates().then(data => {
      this.setState({
        rates: data.rates
      })
    })
  }

  /* make api request to fetch data from mongodb on every other render(file upload) except first */
  componentWillReceiveProps () {
    ApiCall.getFile().then(data => {
      this.setState({
        data
      })
    })
  }

  changeCurrency (event) {
    /* designate base currency and get the current rates from the state */
    fx.base = 'EUR'
    fx.rates = {
      'EUR': 1,
      'CAD': this.state.rates.CAD,
      'CHF': this.state.rates.CHF,
      'GBP': this.state.rates.GBP,
      'JPY': this.state.rates.JPY,
      'USD': this.state.rates.USD
    }
    /* set the state for a chosen currency */
    this.setState({
      newCurrency: event.target.value
    }, () => {
      /* inside of callback of setState make a currency conversion */
      let changeData = []
      this.state.data.map((dataState) => {
        let amount = dataState.amount
        let currency = dataState.currency
        let newCurrency = this.state.newCurrency
        let newAmount = fx.convert(amount, {from: currency, to: newCurrency})
        /* use immutable data structure to merge state from data with new amount and new chosen currency */
        let change = update(dataState, {
          $merge: {amount: newAmount, currency: newCurrency}
        })

        changeData.push(change)
      })
      this.setState({
        changeData
      })
    })
  }

  render () {
    return (
      /* className = bootstrap classes; styleName = cssModules */
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
            {/* map through data state and set the values */}
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
        <select onChange={this.changeCurrency} styleName="button-select">
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
            {this.state.changeData.map(row => {
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
                  {this.state.changeData.reduce((sum, number) => {
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
