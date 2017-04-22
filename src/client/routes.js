/* @flow */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Container from 'Container'
import Browse from 'Browse'
import Analysis from 'Analysis'

export default (
  <Route path='/' component={Container} >
    <Route path='browse' component={Browse} />
    <IndexRoute component={Analysis} />
  </Route>
)
