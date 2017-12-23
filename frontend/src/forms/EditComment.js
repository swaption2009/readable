import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, editComment } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { Container, Button } from 'reactstrap';
import TextField from 'material-ui/TextField';
import { Redirect, Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem }
  from 'reactstrap';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';

class EditComment extends Component {
  state = {
    comment: this.props.comment,
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
    const id = this.props.match.params.id;
    values.timestamp = Date.now();
    console.log(values, id);
    this.props.editComment(values, id)
      .then(res => {
        if (res.payload.status === 200) {
          console.log('SUCCESS! Comment has been edited.');
          this.setState({ redirectToPageShow: true });
        } else {
          console.log('ERROR');
        }
      });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { comment } = this.state;

    if (this.state.redirectToPageShow) {
      return (
        <Redirect to="/" />
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

        <h2>Edit Comment Form</h2>
        <p>(Published Date will be updated on the background)</p>

        <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
          <Field label="Body"
                 name="body"
                 type="text"
                 placeholder={comment.body}
                 component={this.renderTextField} /><br/>
          <Field label="Author"
                 name="author"
                 type="text"
                 placeholder={comment.author}
                 component={this.renderTextField} /><br/>

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

function mapStateToProps(state, ownProps) {
  const comments = state.comments.comments;
  const comment = comments.find(e => e.id = ownProps.match.params.id);
  return { comment };
}

export default reduxForm({
  form: 'EditCommentForm', })
  (connect(mapStateToProps, { fetchComments, editComment })
  (EditComment)
);
