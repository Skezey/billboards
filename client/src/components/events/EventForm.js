import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class ForumForm extends Component {
  state = {
    title: "",
    location: "",
    date: new Date(),
    link: "",
    end_at: new Date()
  };

  componentDidMount() {
    if (this.props.id) {
      this.setState({ title: this.props.title });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    if (this.props.id) {
      this.props.update(this.props.id, this.state);
      this.props.toggleEdit();
    } else {
      this.props.add(this.state);
    }
    this.setState({
      title: "",
      location: "",
      date: new Date(),
      link: "",
      end_at: new Date()
    });
  };

  render() {
    const { title, location, date, link, end_at } = this.state;
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
          placeholder="location"
          label="location"
          name="location"
          value={location}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="start"
          label="start"
          name="date"
          value={date}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="end"
          label="end"
          name="end_at"
          value={end_at}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="link"
          label="link"
          name="link"
          value={link}
          onChange={this.handleChange}
        />
        <Form.Button color="green">Submit</Form.Button>
      </Form>
    );
  }
}

export default ForumForm;
