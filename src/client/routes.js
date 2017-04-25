import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Container from 'Container'
import Browse from 'Browse'

export default (
  <Route path='/' component={Container} >
    <IndexRoute component={Browse} />
  </Route>
)
