import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Genresform extends Component {
  state = { body: '' }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ body: this.props.body })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    if (this.props.id) {
      this.props.update(this.props.id, this.state)
      this.props.toggleEdit()
    } else {
      this.props.add(this.state)
    }
    this.setState({ body: '' })
  }

  render() {
    const { body } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          placeholder='body'
          label='body'
          name='body'
          value={body}
          onChange={this.handleChange}
        />
        <Form.Button color='green'>Submit</Form.Button>
      </Form>
    )
  }
}

export default Genresform;
