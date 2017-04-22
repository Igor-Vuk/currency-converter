/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import './index.local.scss'
import ApiCall from './api.jsx'

class Analysis extends Component {

  constructor () {
    super()
    this.state = {

    }
    const self = this
    self.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount () {
    ApiCall.getFile().then(data => {
      console.log(data)
      this.setState({currency: data[0].currency})
    })
  }

  render (): React.Element<any> {
    return (
      <div styleName="container">
        <h1>Analysis component</h1>
      </div>
    )
  }
}

export default Analysis
