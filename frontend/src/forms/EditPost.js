import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  fetchPost,
  editPost,
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
  form: 'EditPostForm',
  validate,
});

const renderField = field => (
  <div>
    <Input {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
  );

class EditPostForm extends Component {
  state = {
    redirectToHomePage: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id)
      .then(res =>
        this.handleInitialize(res.payload.data));
  }

  handleInitialize() {
    if (!this.props.post) {
      console.log('this.props.post empty');
    } else {
      const initData = {
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author,
        category: this.props.post.category,
      };

      this.props.initialize(initData);
    }
  }

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

        <h2>Edit Page Form</h2>
        <p>(Published Date will be updated on the background)</p>

        <FormGroup>
          <Form onSubmit={handleSubmit(this.onSubmit)}>

            <Label>Title:</Label>
            <Field name="title" type="text" component={renderField}/>

            <Label>Body:</Label>
            <Field name="body" type="text" component={renderField}/>

            <Label>Author:</Label>
            <Field name="author" type="text" component={renderField} />

            <Label>Category:</Label><br/>
            <Field name="category" type="select" component="select">
              <option name="react">React</option>
              <option name="redux">Redux</option>
              <option name="udacity">Udacity</option>
            </Field>
            <br/>
            <br/>

            <Button action="submit">Save changes</Button>
          </Form>
        </FormGroup>
      </Container>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = 'Please enter a title';
  }

  if (!formProps.body) {
    errors.body = 'Please enter texts for the post';
  }

  if (!formProps.author) {
    errors.author = 'Please enter the name of the author';
  }

  if (!formProps.category) {
    errors.category = 'Please select a category';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
  };
}

export default connect(
  mapStateToProps,
  { fetchPost, editPost })
(form(EditPostForm));
