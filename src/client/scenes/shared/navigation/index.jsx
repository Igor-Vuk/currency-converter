/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, { Component } from 'react'
import './index.local.scss'

class Navigation extends Component {
  render () {
    return (
      <div styleName="container">
        <nav className="navbar navbar-toggleable-sm navbar-light bg-faded" styleName="nav-bar">
          {/* hamburger menu on small screen size */}
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          {/* navigation bar brend */}
          <a className="navbar-brand" href="/">Currency Converter</a>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <span className="navbar-text" styleName="nav-text">Made by <a href="https://github.com/Igor-Vuk/currency-converter" target="_blank">Igor Vukelic</a></span>
            </div>
          </div>
        </nav>

      </div>
    )
  }
}

export default Navigation
