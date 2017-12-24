import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Button } from 'reactstrap';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { createComment } from '../actions';
import { Redirect } from 'react-router-dom';

class NewComment extends Component {
  state = {
    redirectToPageShow: false,
  };

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  onSubmit = (values) => {
    values.id = uuid.v4();
    values.timestamp = Date.now();
    values.parentId = this.props.match.params.id;
    values.voteScore = 0;
    this.props.createComment(JSON.stringify(values))
      .then(res => {
        if (res.payload.status === 200) {
          console.log('SUCCESS! New comment has been created.');
          this.setState({ redirectToPageShow: true });
        } else {
          console.log('ERROR');
        }
      });
  };

  // TODO fix redirect to POST_URL
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    // TODO fix URL /:category/:id
    const POST_URL = `/posts/${this.props.match.params.id}`;

    if (this.state.redirectToPageShow) {
      return (
        <Redirect to={POST_URL} />
      );
    }

    return (
      <Container>
        <Navbar color="faded" light expand="md">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">
                <FaArrowCircleLeft size={40} color='red' />
                Back to post index page
              </Link>
            </NavItem>
          </Nav>
        </Navbar>

        <h2>New Comment Form</h2>
        <p>(UUID, Publised Date, and ParentID are created on the background)</p>

        <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
          <Field label="Body" name="body" type="text" component={this.renderTextField} /><br/>
          <Field label="Author" name="author" type="text" component={this.renderTextField} /><br/>

          <Button type="submit" color="primary" disabled={pristine || submitting}>
            Submit Form
          </Button>{' '}

          <Button type="submit" color="danger" onClick={reset}>
            Reset Form
          </Button>
        </form>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'body',
    'author',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: 'NewCommentForm', })(connect(
    null,
    { createComment }
)(NewComment));
