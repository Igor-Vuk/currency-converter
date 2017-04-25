import React from 'react'
import Navigation from 'Navigation'

function Container ({children}) {
  return (
    <div>
      <Navigation />
      { children }
    </div>
  )
}

export default Container
