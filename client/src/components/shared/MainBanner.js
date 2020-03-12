import React from "react";
import { Image } from "semantic-ui-react";

const MainBanner = () => (
  <div
    style={{
      marginTop: "10px",
      boxShadow: "1px 1px 1px 1px #000000"
    }}
  >
    <a
      href="https://open.spotify.com/playlist/37i9dQZF1E4qMZgFJMnsxW?si=iS95El1eQ3mq1jevaQhH7A"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/pinkbackground_1_900x200.png" fluid />
    </a>
  </div>
);

export default MainBanner;
