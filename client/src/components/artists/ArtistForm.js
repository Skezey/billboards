import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class ArtistForm extends Component {
  state = {
    name: "",
    rank: "",
    main_img: "",
    secondary_img: "",
    spotify_link: "",
    description: ""
  };

  componentDidMount() {
    if (this.props.id) {
      this.setState({
        name: this.props.name,
        rank: this.props.rank,
        main_img: this.props.main_img,
        sexondary_img: this.props.secondary_img,
        spotify_link: this.props.spotify_link,
        description: this.props.description
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
    this.setState({
      name: "",
      rank: "",
      main_img: "",
      sexondary_img: "",
      spotify_link: "",
      description: ""
    });
  };

  render() {
    const {
      name,
      rank,
      main_img,
      secondary_img,
      spotify_link,
      description
    } = this.state;
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
          placeholder="rank"
          label="rank"
          name="rank"
          value={rank}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          placeholder="main_img"
          label="main_img"
          name="main_img"
          value={main_img}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="secondary_img"
          label="secondary_img"
          name="secondary_img"
          value={secondary_img}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="spotify_link"
          label="spotify_link"
          name="spotify_link"
          value={spotify_link}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="description"
          label="description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <Form.Button color="green">Submit</Form.Button>
      </Form>
    );
  }
}

export default ArtistForm;
