import React from "react";
import { Link } from "react-router-dom";
import { Header, Image } from "semantic-ui-react";

const Nomatch = () => (
  <div style={{ height: "max", backgroundColor: "white" }}>
    <Image src="/404notfound.png" fluid />
    <Header as="h3" textAlign="center">
      Page not found. Return
      <Link to="/"> Home</Link>
    </Header>
  </div>
);

export default Nomatch;
