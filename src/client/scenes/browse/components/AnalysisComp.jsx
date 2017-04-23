/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import ApiCall from 'ApiCall'
import './analysisComp.local.scss'

class AnalysisComp extends Component {

  constructor () {
    super()
    this.state = {
      data: []
    }
    const self = this
    self.componentWillMount = this.componentWillMount.bind(this)
    self.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillMount () {
    ApiCall.getFile().then(data => {
      console.log(data)
      this.setState({
        data: data
      })
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

  render (): React.Element<any> {
    return (
      <div styleName="container">

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(row => {
              return (
                <tr key={row._id}>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                  <td>{row.currency}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
  }
}

export default AnalysisComp
