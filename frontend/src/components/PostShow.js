import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchComments } from '../actions'
import _ from 'lodash'
import { Card, Button, CardTitle, CardText, CardSubtitle, CardBody, Navbar, Nav, NavItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'
import PostComment from './PostComment'
import Votes from "./Votes";

class PostShow extends Component {
  // TODO add comment (use Redux Form NewComment)
  // TODO edit post
  // TODO delete post

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
    this.props.fetchComments(id)
  }

  render() {
    const { post } = this.props

    if (!post) {
      return <div>Loading...</div>
    }

    const post_array = _.toArray(post)

    return (
      <div>
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

        <Card>
          <CardBody>
            <CardTitle className="text-primary">{post_array[2]}</CardTitle>
            <CardSubtitle className="text-success">Author: {post_array[4]}</CardSubtitle><br/>
            <CardText>{post_array[3]}</CardText>
            <CardText className="text-danger">Votes: {post_array[6]}</CardText>
            <CardText>{post_array[1]}</CardText>
            <Button outline color="primary">category: {post_array[5]}</Button>
            <Votes/>
          </CardBody>
        </Card>

        <PostComment parentId={post_array[0]}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, fetchComments })(PostShow)