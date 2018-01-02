import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Button } from 'reactstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Link, Redirect } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem }
  from 'reactstrap';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class NewPost extends Component {
  state = {
    redirectToHomePage: false,
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

  renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );

  onSubmit = (values) => {
    values.id = uuid.v4();
    values.timestamp = Date.now();
    values.voteScore = 0;
    this.props.createPost(JSON.stringify(values))
      .then(res => {
        if (res.payload.status === 200) {
          console.log('REDIRECTING...');
          this.setState({ redirectToHomePage: true });
        } else {
          console.log('ERROR');
        }
      });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    if (this.state.redirectToHomePage) {
      return (
        <Redirect to="/"/>
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

        <h2>New Post Form</h2>
        <p>(UUID and Publised Date are created on the background)</p>

        <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
          <Field label="Title" name="title" type="text" component={this.renderTextField} /><br/>
          <Field label="Body" name="body" type="text" component={this.renderTextField} /><br/>
          <Field label="Author" name="author" type="text" component={this.renderTextField} /><br/>
          <Field label="Category" name="category" component={this.renderSelectField}>
            <MenuItem value="react" primaryText="React" />
            <MenuItem value="redux" primaryText="Redux" />
            <MenuItem value="udacity" primaryText="Udacity" />
          </Field><br/>
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
    'title',
    'body',
    'author',
    'category',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Field can't be blank";
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  form: 'NewPostForm', })(connect(
    null,
  { createPost }
)(NewPost));
