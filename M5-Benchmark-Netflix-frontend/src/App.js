import logo from "./logo.svg";
import "./App.css";
import MyNav from "./components/HeaderFooter/MyNav.jsx";
import MyFooter from "./components/HeaderFooter/MyFooter.jsx";
import MyJumbotron from "./components/MyJumbotron.jsx";
import RowOfMovies from "./components/RowOfMovies";
import BackOffice from "./components/BackOffice";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <MyNav />
      <MyJumbotron />
      <Container className="movies_container" fluid>
        <RowOfMovies title="Harry Potter" />
        <RowOfMovies title="Bean" />
        <RowOfMovies title="Love" />
      </Container>
      <Router>
        {/* <Route path="/backoffice/:movieID" {<BackOffice />} /> */}
      </Router>
      <MyFooter />
    </div>
  );
}

export default App;
