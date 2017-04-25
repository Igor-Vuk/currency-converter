/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import axios from 'axios'
import './uploadComp.local.scss'

class UploadComp extends Component {
  constructor () {
    super()
    this.state = {
      uploaded: false
    }

    const self = this
    self.dropHandler = this.dropHandler.bind(this)
  }

  dropHandler (event) {
    event.preventDefault()
    let fileUpload = event.target.files[0]
    let formData = new FormData()
    formData.append('file', fileUpload)
    /* send form data and upon receiving response call onUpload prop passed down from index component */
    axios.post('/exchange', formData).then((res) => {
      this.props.onUpload()
    })
  }

  render () {
    return (
      /* className = bootstrap classes; styleName = cssModules */
      <div className="container" styleName="container">
        <div className="fileInput">
          <label htmlFor="fileInput">File input</label>
          <input type="file" name="file" accept=".json" onChange={this.dropHandler} />
          <small id="fileHelp" className="form-text text-muted">Upload JSON file format</small>
        </div>
      </div>
    )
  }
}

export default UploadComp
