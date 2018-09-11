import React from 'react'
import {connect} from 'react-redux'
import {getGifsThunk} from '../store'
import { Form, Input, Button } from 'semantic-ui-react'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputAnswer: "",
    }
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.getGifs(this.state.inputAnswer);
  }

  handleChange = (evt) => {
    this.setState({inputAnswer: evt.target.value})
  }

  render() {
    const gifs = this.props.gifs;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Input placeholder='Search...' onChange={this.handleChange} />
          <Button type="submit">Submit</Button>
        </Form>
        {
          gifs ? gifs.map(gif =>
            <div key={gif.id} >
              <img src={gif.images.downsized.url} />
            </div>
          ):
          null
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
    getGifs(query) {
      return dispatch(getGifsThunk(query))
    }
  }
}

export default connect(mapState, mapDispatch)(Home)
