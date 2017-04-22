/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './index.local.scss'

class Browse extends Component {
  constructor () {
    super()

    const self = this
    self.dropHandler = this.dropHandler.bind(this)
  }

  dropHandler (event: any) {
    event.preventDefault()
    const fileUpload = event.target.files[0]
    console.log(fileUpload)
    let formData = new FormData()
    formData.append('file', fileUpload)

    fetch('/exchange', {
      method: 'post',
      body: formData
    })
  }

  render (): React.Element<any> {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-xs-5">
            <form encType="multipart/form-data">
              {/* <div className="form-group">
                <label htmlFor="dateInput">Date</label>
                <input type="date" ref="date" className="form-control" id="dateInput" aria-describedby="emailHelp" placeholder="Enter date" />
              </div> */}

              <div className="form-group">
                <label htmlFor="fileInput">File input</label>
                <input type="file" name="file" accept=".json" className="form-control-file" id="fileInput" aria-describedby="fileHelp" onChange={this.dropHandler} />
                <small id="fileHelp" className="form-text text-muted">Upload JSON file format</small>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>{/* row */}
      </div>
    )
  }
}

export default Browse
