import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class SongForm extends Component {
  state = { name: "", email: "", role: "", password: "" };

  componentDidMount() {
    if (this.props.id) {
      this.setState({
        name: this.props.name,
        email: this.props.email,
        role: this.props.role,
        password: this.props.password
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    console.log(this.props);
    if (this.props.id) {
      this.props.update(this.props.id, this.state);
      this.props.toggleEdit();
    } else {
      this.props.add(this.state);
    }
    this.setState({ name: "", email: "", role: "", password: "" });
  };

  render() {
    const { name, email, role, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          placeholder="name"
          label="name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="email"
          label="email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="role"
          label="role"
          name="role"
          value={role}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="password"
          label="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <Form.Button color="green">Submit</Form.Button>
      </Form>
    );
  }
}

export default SongForm;
