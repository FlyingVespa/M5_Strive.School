import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class BackOffice extends Component {
  state = {
    comment: {},
  };
  componentDidMount = async () => {
    const commentURL = `https://striveschool-api.herokuapp.com/api/comments/`;
    const APIkey =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MzExZDcwNDBkZjAwMTU4NWM4MDIiLCJpYXQiOjE2MjM2MDYyMjYsImV4cCI6MTYyNDgxNTgyNn0.X_v8ZgYjqf7ggYTB9FEPB6S9dfBb88D4LKJ80Mn425c";
    try {
      let res = await fetch(
        commentURL,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: APIkey,
          },
        },
        {}
      );
      let commentData = await res.json();
      console.log(commentData);
      this.setState({ comment: commentData });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
