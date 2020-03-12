import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class PlaylistForm extends Component {
  state = { title: "", link: "", image: "" };

  componentDidMount() {
    if (this.props.id) {
      this.setState({
        title: this.props.title,
        image: this.props.image,
        link: this.props.link
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    if (this.props.id) {
      this.props.update(this.props.id, this.state);
      this.props.toggleEdit();
    } else {
      this.props.add(this.state);
    }
    this.setState({
      title: "",
      image: "",
      link: ""
    });
  };

  render() {
    const { title, link, image } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          placeholder="title"
          label="title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="link"
          label="link"
          name="link"
          value={link}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="image"
          label="image"
          name="image"
          value={image}
          onChange={this.handleChange}
        />
        <Form.Button color="green">Submit</Form.Button>
      </Form>
    );
  }
}

export default PlaylistForm;
