/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import UploadComp from './components/UploadComp'
import AnalysisComp from './components/AnalysisComp'

class Browse extends Component {

  constructor () {
    super()
    this.state = {
      uploaded: false,
      data: []
    }

    const self = this
    self.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload () {
    this.setState({
      uploaded: true
    })
  }

  render (): React.Element<any> {
    var {uploaded} = this.state
    function renderData () {
      if (uploaded === true) {
        return (
          <AnalysisComp />
        )
      }
    }

    return (
      <div>
        <UploadComp onUpload={this.handleUpload} />
        {renderData()}
      </div>
    )
  }
}

export default Browse
