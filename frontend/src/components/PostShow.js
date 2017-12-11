import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import _ from 'lodash'
import { Card, Button, CardTitle, CardText, CardSubtitle, CardBody, Navbar, Nav, NavItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'

class PostShow extends Component {
  // TODO create Comment component
  // TODO create thumbs up & down function
  // TODO add comment (use Redux Form NewComment)
  // TODO edit post
  // TODO delete post

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  render() {
    const { post } = this.props

    if (!post) {
      return <div>Loading...</div>
    }

    const post_array = _.toArray(post)
    // console.log(post_array)

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">
                <FaArrowCircleLeft size={25} />
                Back to post index page
              </Link>
            </NavItem>
          </Nav>
        </Navbar>

        <Card>
          <CardBody>
            <CardTitle className="text-primary">{post_array[2]}</CardTitle>
            <CardSubtitle className="text-success">Author: {post_array[4]}</CardSubtitle><br/>
            <CardText>{post_array[3]}</CardText>
            <CardText className="text-danger">Votes: {post_array[6]}</CardText>
            {/* TODO format Unix timestamp */}
            <CardText>{post_array[1]}</CardText>
            <Button outline color="primary">category: {post_array[5]}</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost })(PostShow)