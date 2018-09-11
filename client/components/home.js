import React from 'react'
import {connect} from 'react-redux'
import {getGifsThunk} from '../store'

class Home extends React.Component {
  componentDidMount() {
    this.props.getGifs();
  }

  render() {
    const gifs = this.props.gifs;
    return (
      <div>
        {gifs ? gifs.map(gif =>
          <div key={gif.id} >
            <img src={gif.images.downsized.url} />
          </div>
          ):
          <h1>No</h1>
        }
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = ({gifs}) => {
  return {
    gifs
  }
}

const mapDispatch = dispatch => {
  return {
    getGifs() {
      return dispatch(getGifsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Home)
