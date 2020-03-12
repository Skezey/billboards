import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class SongForm extends Component {
  state = { title: '', year: '', album: '' }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ title: this.props.title,
                      year: this.props.year,
                      album: this.props.album
                    })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    console.log(this.props)
    if (this.props.id) {
      this.props.update(this.props.id, this.state)
      this.props.toggleEdit()
    } else {
      this.props.add(this.state)
    }
    this.setState({ title: '', year: '', album: '' })
  }

  render() {
    const { title, year, album } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          placeholder='title'
          label='title'
          name='title'
          value={title}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder='year'
          label='year'
          name='year'
          value={year}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder='album'
          label='album'
          name='album'
          value={album}
          onChange={this.handleChange}
        />
        <Form.Button color='green'>Submit</Form.Button>
      </Form>
    )
  }
}

export default SongForm;
