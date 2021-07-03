import { Image } from "react-bootstrap";

const SingleMovie = (props) => {
  return (
    <>
      <Image id="netflix_logo" src="Netflix_Logo_RGB.png" />
      <Image id="movie_card" src={props.img} />
    </>
  );
};

export default SingleMovie;
