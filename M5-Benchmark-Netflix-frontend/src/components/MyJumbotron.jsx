import { Jumbotron, Image, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const MyJumbotron = () => {
  return (
    <>
      <Jumbotron>
        <video
          muted
          loop
          autoPlay
          src="https://cdn.videvo.net/videvo_files/video/free/2019-04/small_watermarked/181015_14b_VeniceBeachSkatepark_13_preview.webm"
        ></video>

        <Button variant="light">
          <Icon.PlayFill size={26} />
          Play
        </Button>
        <Button variant="dark">
          <Icon.InfoCircle size={26} />
          More Info
        </Button>
      </Jumbotron>
      <div id="bottom_fade"></div>
    </>
  );
};

export default MyJumbotron;
