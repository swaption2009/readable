import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  fetchComments,
  editComment,
} from '../actions';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  Navbar,
  NavItem,
} from 'reactstrap';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';

const form = reduxForm({
  form: 'EditCommentForm',
  validate,
});

const renderField = field => (
  <div>
    <Input {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

class EditCommentForm extends Component {
  state = {
    comment: this.props.comment,
    redirectToHomePage: false,
  };

  componentWillMount() {
    this.handleInitialize(this.state.comment);
  }

  handleInitialize = (comment) => {
    const initData = {
      body: comment.body,
      author: comment.author,
    };
    this.props.initialize(initData);
  };

  onSubmit = (values) => {
    const id = this.props.match.params.id;
    console.log(id);
    values.timestamp = Date.now();
    this.props.editComment(values, id)
      .then(res => {
        if (res.payload.status === 200) {
          console.log('SUCCESS! Comment has been edited.');
          this.setState({ redirectToHomePage: true });
        } else {
          console.log('ERROR');
        }
      });
  };

  render() {
    const { handleSubmit } = this.props;

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

        <h2>Edit Comment Form</h2>
        <p>(Published Date will be updated on the background)</p>

        <FormGroup>
          <Form onSubmit={handleSubmit(this.onSubmit)}>

            <Label>Body:</Label>
            <Field name="body" type="text" component={renderField}/>

            <Label>Author:</Label>
            <Field name="author" type="text" component={renderField} />

            <Button action="submit">Save changes</Button>
          </Form>
        </FormGroup>
      </Container>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.body) {
    errors.body = 'Please enter texts for the post';
  }

  if (!formProps.author) {
    errors.author = 'Please enter the name of the author';
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  const comments = state.comments.comments;
  const comment = comments.find(e => e.id === ownProps.match.params.id);
  return { comment };
}

export default connect(
  mapStateToProps,
  { fetchComments,
    editComment,
  })
(form(EditCommentForm));
