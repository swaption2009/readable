import React, { Component } from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from 'reactstrap';
import Moment from 'react-moment';
import Votes from './Votes';
import PropTypes from 'prop-types';
import {
  deleteComment,
  deletePost,
} from '../actions';
import { connect } from 'react-redux';

class Deck extends Component {
  state = {
    redirectToPageShow: false,
  };

  onDeletePost = (e) => {
    this.props.deletePost(e.target.dataset.message)
      .then(res => {
        if (res.payload.status === 200) {
          console.log(this.state.props);
          this.setState({
            redirectToPageShow: true,
          });
        } else {
          console.log('error');
        }
      });
  };

  onDeleteComment = (e) => {
    this.props.deleteComment(e.target.dataset.message)
      .then(res => {
        if (res.payload.status === 200) {
          this.setState({
            redirectToPageShow: true,
          });
        } else {
          console.log('ERROR');
        }
      });
  };

  render() {
    const { posts, type, onCardSelected } = this.props;

    if (this.state.redirectToPageShow) {
      return (
        <Redirect to='/posts/new' />
      );
    }

    return (
      <div>
        <CardDeck>
          {posts.map(post =>
            <Card key={post.timestamp}>
              <CardImg
                top width="100%"
                src="http://placekitten.com/g/256/180"
                alt="Card image cap"/>
              <CardBody>
                <CardTitle
                  className="text-primary"
                  onClick={() => onCardSelected({ post })} >
                  {post.title}
                </CardTitle>
                <CardSubtitle className="text-success">Author: {post.author}</CardSubtitle>
                <CardText>{post.body}</CardText>
                { type === 'comment' ?
                  <div></div> :
                  <CardText className="text-warning">Comment Count: {post.commentCount}</CardText>
                }
                <CardText className="text-danger">Votes: {post.voteScore}</CardText>
                <Votes
                  postId={post.id}
                  postVotes={post.voteScore} />
                <CardText>Published Date: <Moment unix>{post.timestamp}</Moment></CardText>
                { !post.category ?
                  <div></div> :
                  <Badge color="secondary">category: {post.category}</Badge>
                }
                <br/>
                { type === 'comment' ?
                  <Link to={`/posts/${post.parentId}/comments/${post.id}/edit`}>
                    <Button color="warning">Edit Comment</Button>
                  </Link> :
                  <Link to={`/${post.category}/${post.id}/edit`}>
                    <Button color="warning">Edit Post</Button>
                  </Link>
                }
                <br/>
                { type === 'comment' ?
                  <Button
                    color="danger"
                    data-message={post.id}
                    onClick={this.onDeleteComment}>
                    Delete Comment
                  </Button> :
                  <Button
                    color="danger"
                    data-message={post.id}
                    onClick={this.onDeletePost}>
                    Delete Post
                  </Button>
                }
              </CardBody>
            </Card>
          )}
        </CardDeck>
      </div>
    );
  }
}

Deck.propTypes = {
  props: PropTypes.object,
};

export default connect(
  null,
  { deleteComment, deletePost })(Deck);
