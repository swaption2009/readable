import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, editPost } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Container, Button } from 'reactstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';

class EditPost extends Component {
  state = {
    post: {},
    redirectToHomePage: false,
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id)
      .then(res =>
        this.setState({ post: res.payload.data })
      );
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
    const id = this.props.match.params;
    values.timestamp = Date.now();
    this.props.editPost(values, id)
      .then(res => {
        if (res.payload.status === 200) {
          this.setState({ redirectToHomePage: true });
        } else {
          console.log('ERROR');
        }
      });
  };

  render() {
    const { post } = this.state;
    const { handleSubmit, pristine, reset, submitting } = this.props;

    if (post.length === 0) {return <div>Loading...</div>; }

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

        <h2>Edit Page Form</h2>
        <p>(Published Date will be updated on the background)</p>

        <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
          <Field label="Title"
                 name="title"
                 type="text"
                 placeholder={post.title}
                 component={this.renderTextField}/><br/>
          <Field label="Body"
                 name="body"
                 type="text"
                 placeholder={post.body}
                 component={this.renderTextField} /><br/>
          <Field label="Author"
                 name="author"
                 type="text"
                 placeholder={post.author}
                 component={this.renderTextField} /><br/>
          <Field label="Category"
                 name="category"
                 placeholder={post.category}
                 component={this.renderSelectField}>
            <MenuItem value="react" primaryText="react" />
            <MenuItem value="redux" primaryText="redux" />
            <MenuItem value="udacity" primaryText="udacity" />
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

export default reduxForm({
  form: 'EditPostForm',
})(connect(
  null,
  { fetchPost, editPost }
)(EditPost));
