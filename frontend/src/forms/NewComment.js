import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Container, Button } from 'reactstrap'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem} from 'reactstrap'
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'
import uuid from 'uuid'

class NewComment extends Component {
  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  onSubmit = (values) => {
    values.id = uuid.v4()
    values.timestamp = Date.now()
    values.parentId = "8xf0y6ziyjabvozdd253nd" // TODO replace with react-router /:id match props
    console.log('onSubmit values: ', values)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

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
    )
  }
}

const validate = (values) => {
  const errors = {}

  const requiredFields = [
    'body',
    'author',
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'NewCommentForm'
})(NewComment)