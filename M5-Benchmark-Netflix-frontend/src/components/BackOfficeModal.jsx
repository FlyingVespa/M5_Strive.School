import React, { Component } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
export default class BackOfficeModal extends Component {
  render() {
    return (
      <>
        <>
          <Modal
            size="lg"
            show={this.props.open}
            onHide={this.props.close}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Update Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => this.handleProfileUpdate(e)}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      id="name"
                      type="text"
                      placeholder={this.props.name}
                      onChange={(e) => this.inputChange(e)}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      id="surname"
                      type="text"
                      placeholder={this.props.surname}
                      onChange={(e) => this.inputChange(e)}
                      disabled
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      id="bio"
                      type="text"
                      placeholder={this.props.bio}
                      onChange={(e) => this.inputChange(e)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      id="username"
                      type="text"
                      placeholder={this.props.username}
                      onChange={(e) => this.inputChange(e)}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Pic</Form.Label>
                  <Form.Control
                    id="image"
                    type="text"
                    placeholder={this.props.image}
                    onChange={(e) => this.inputChange(e)}
                  />
                </Form.Group>
                <Button variant="secondary">Close</Button>
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      </>
    );
  }
}
