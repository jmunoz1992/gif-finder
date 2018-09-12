import React from 'react'
import {connect} from 'react-redux'
import {getGifsThunk} from '../store'
import { Form, Input, Button, Message} from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputAnswer: "",
      hideMessage: true,
      titleGif: "",
    }
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.getGifs(this.state.inputAnswer);
    this.setState({hideMessage: true, titleGif: ""})
  }

  handleChange = (evt) => {
    this.setState({inputAnswer: evt.target.value})
  }

  handleClick = (evt) => {
    const title = evt.target.attributes[0].nodeValue
    const gifUrl = evt.target.attributes[1].nodeValue
    this.setState({hideMessage: false, titleGif: title})
    copy(gifUrl)
  }

  render() {
    const gifs = this.props.gifs;
    const bodyStyle = {
      margin: "0 auto",
      width: "80%",
    }
    const title = {
      textAlign: "center",
      fontSize: "100px",
      color: "#21ba45",
      fontFamily: "Arial, sans-serif"
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
    const messageStyle = {
      width: "80%",
      margin: "0 auto",
      position: "fixed"
    }
    return (
      <div style={bodyStyle}>
        <Message style={messageStyle} success hidden={this.state.hideMessage}>You have copied <b>{this.state.titleGif}</b> to your clipboard.</Message>
        <br /><br />
        <div>
          <h1 style={title}>GIFINDER</h1>
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
              {
                const gifUrl = gif.images.downsized.url
                return (<img style={imgStyle} value={gif.title} key={gif.id} src={gifUrl} onClick={(evt) => this.handleClick(evt)}/>)
              }
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
