import React from 'react'
import {connect} from 'react-redux'

const Home = () => (
  <div>
    <h1>HOME PAGE</h1>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {

  }
}

const mapDispatch = dispatch => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Home)
