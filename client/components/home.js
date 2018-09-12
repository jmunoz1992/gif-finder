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
    const bodyStyle = {
      margin: "0 auto",
      width: "80%",
    }
    const imgPackStyle = {
      display: "flex",
      flexWrap: "wrap",
      margin: "0 auto",
      justifyContent: "center",
    }
    const imgStyle = {
      margin: "5px",
      alignItems: "flex-start",
      display: "flex",
      flexWrap: "wrap",
    }
    const inputStyle = {
      width: "900px"
    }
    return (
      <div style={bodyStyle}>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Input style={inputStyle} placeholder='Search...' onChange={this.handleChange} />
            <Button color="green" type="submit">Submit</Button>
            <br />
          </Form>
        </div>
        <br />
        <div style={imgPackStyle}>
          {
            gifs ?
            gifs.map(gif =>
                <img style={imgStyle} key={gif.id} src={gif.images.downsized.url} />
            ) : null
          }
        </div>
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
