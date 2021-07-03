import React, { Component } from "react";
import SingleMovie from "./SingleMovie";

import { Carousel, Row, Image, Col, Container } from "react-bootstrap";

export default class RowOfMovies extends Component {
  state = {
    movies: [],
  };
  //   const showDetails =() =>{
  //       const movieDetails = document.querySelector(".movie_details")
  //       movieDetails.setAttribute("className","movie_details")
  //   }

  componentDidMount = async () => {
    const altEndpoint = `http://www.omdbapi.com/?apikey=b35b3d1f&s=${this.props.title}`;

    try {
      let resp = await fetch(altEndpoint, {
        // method: "GET",
        // header,
      });
      let jsonData = await resp.json();
      console.log(jsonData);
      this.setState({ movies: jsonData.Search });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { movies } = this.state;
    return (
      <Container fluid>
        <h2 className="m-2">{this.props.title}</h2>
        <Carousel>
          <Carousel.Item>
            <Row>
              {movies.slice(0, 6).map((movie) => (
                <Col>
                  <SingleMovie img={movie.Poster} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              {movies.slice(4, 10).map((movie) => (
                <Col>
                  <SingleMovie img={movie.Poster} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}
