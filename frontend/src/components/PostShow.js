import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchComments, deletePost } from '../actions'
import _ from 'lodash'
import { Card, Button, CardTitle, CardText, CardSubtitle, CardBody, Navbar, Nav, NavItem} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'
import PostComment from './PostComment'
import Votes from "../shared/Votes"
import Moment from 'react-moment'

class PostShow extends Component {
  state = {
    redirectToHomePage: false
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
    this.props.fetchComments(id)
  }

  onDeletePost = () => {
    const { id } = this.props.match.params
    this.props.deletePost(id)
      .then(res => {
        if (res.payload.status === 200) {
          this.setState({redirectToHomePage: true});
        } else {
          console.log("ERROR");
        }
      })
  }

  render() {
    const { post } = this.props
    const EDIT_POST_URL = `/posts/${this.props.match.params.id}/edit`

    if (!post) {
      return <div>Loading...</div>
    }

    if (this.state.redirectToHomePage) {
      return (
        <Redirect to="/"/>
      )
    }

    const post_array = _.toArray(post)

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">
                <FaArrowCircleLeft size={40} color="blue" />
                Back to post index page
              </Link>{' '}
              <Link to={EDIT_POST_URL}><Button color="warning">Edit Post</Button></Link>{' '}
              <Button color="danger" onClick={this.onDeletePost}>Delete Post</Button>
            </NavItem>
          </Nav>
        </Navbar>

        <Card>
          <CardBody>
            <CardTitle className="text-primary">{post_array[2]}</CardTitle>
            <CardSubtitle className="text-success">Author: {post_array[4]}</CardSubtitle><br/>
            <CardText>Body: {post_array[3]}</CardText>
            <CardText>Published Date: <Moment unix>{post_array[1]}</Moment></CardText>
            <Button outline color="primary">category: {post_array[5]}</Button>
            <br/>
            <Votes id={post_array[0]} />
            <CardText className="text-danger">Votes: {post_array[6]}</CardText>
          </CardBody>
        </Card>

        <PostComment parentId={post_array[0]} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, fetchComments, deletePost })(PostShow)