import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { createPractice } from "../../js/actions/practice_actions.js";

class EditPractice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { practice: this.props.location.state.practice };
    this.handleChange = this.handleChange.bind(this);
  }

  contactRows = () => {
    const { contact } = this.state.practice;

    console.log("contact: ", contact);

    let contactForm = [];

    {
      for (const entry in contact) {
        contactForm.push(
          <div>
            <Row>
              <Col md={{ span: 2, offset: 4 }}>
                <label for="contactType">Contact Type</label>
              </Col>
              <Col md={{ span: 2 }}>
                <label for="contactInfo">Contact Info</label>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2, offset: 4 }}>
                <input
                  type="text"
                  id={entry}
                  data-kind="type"
                  value={entry}
                  onChange={this.handleChange}
                  name={`contactType${entry}`}
                />
              </Col>
              <Col md={{ span: 2 }}>
                <input
                  type="text"
                  id={`${entry}-values`}
                  data-kind="value"
                  value={contact[entry]}
                  onChange={this.handleChange}
                  name={`contactInfo${entry}`}
                />
              </Col>
            </Row>
          </div>
        );
      }
    }
    return contactForm;
  };

  addContactField = e => {
    e.preventDefault();
    const { contactRowValues } = this.state;

    let updatedContactRowValues = contactRowValues;

    updatedContactRowValues.push({ type: "", value: "" });

    this.setState({
      contactRowValues: updatedContactRowValues
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { contactRowValues } = this.state;
    let kind = e.target.getAttribute("data-kind");
    let id = e.target.id;
    let updatedContactRowValues = contactRowValues;

    updatedContactRowValues[id][kind] = e.target.value;

    this.setState({
      contactRowValues: updatedContactRowValues
    });
  };

  render() {
    const { user, dispatch, isFetching, contactRowValues } = this.props;
    const { practice } = this.state;
    return (
      <div>
        <Formik
          initialValues={{
            name: practice.name,
            userId: user.id,
            staff: practice.staff
          }}
          onSubmit={values => {
            dispatch(createPractice(values));
          }}
        >
          {({ isFetching, responseStatus }) => (
            <Form>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="name">Practice Name</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="name" /> <br />
                </Col>
              </Row>
              {this.contactRows()}
              <Col md={{ span: 2, offset: 4 }}>
                <button type="addContact" onClick={this.addContactField}>
                  Add Contact Type
                </button>
              </Col>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <label for="staff">Staff</label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 2, offset: 4 }}>
                  <Field type="text" name="staff" /> <br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{""}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button type="submit" disabled={isFetching}>
                    Next
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isFetching } = state.practices;
  const { user } = state.user;

  return { user, isFetching };
}

export default connect(mapStateToProps)(EditPractice);
