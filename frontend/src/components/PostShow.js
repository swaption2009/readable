import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPost,
  fetchComments,
  deletePost
} from '../actions';
import { Link, Redirect } from 'react-router-dom';
import Cards from '../shared/Cards';
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';
import PostComment from './PostComment';
import {
  Navbar,
  Nav,
  NavItem }
  from 'reactstrap';

class PostShow extends Component {
  state = {
    redirectToHomePage: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id)
      .then(res => {
        if (!res.payload.data.id) {
          console.log('error in fetchPost');
          this.props.history.push('/');
        } else {
          console.log(res);
        }
      });
    this.props.fetchComments(id);
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <div>Loading...</div>
      );
    }

    if (this.state.redirectToHomePage) {
      return (
        <Redirect to='/' />
      );
    }

    const postArray = [post];

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">
                <FaArrowCircleLeft size={40} color="blue" />
                Back to post index page
              </Link>
            </NavItem>
          </Nav>
        </Navbar>

        <Cards
          posts={postArray}
          type="post"
          onCardSelected={() => console.log('do nothing')}
        />
        <PostComment
          category={postArray[0].category}
          parentId={postArray[0].id} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return (
    { post: state.posts.post }
  );
}

export default connect(
  mapStateToProps,
  { fetchPost, fetchComments, deletePost }
  )(PostShow);
