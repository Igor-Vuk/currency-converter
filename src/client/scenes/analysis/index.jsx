/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import './index.local.scss'

class Analysis extends Component {
  render (): React.Element<any> {
    return (
      <div styleName="container">
        <h1>Analysis component</h1>
      </div>
    )
  }
}

export default Analysis
