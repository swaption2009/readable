import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody }
  from 'reactstrap';
import Votes from '../shared/Votes';
import { Link } from 'react-router-dom';
import { deleteComment } from '../actions';
import Moment from 'react-moment';

class PostComment extends Component{
  onDeleteComment = (e) => {
    console.log('comment id to be deleted: ', e.target.dataset.message);
    this.props.deleteComment(e.target.dataset.message)
      .then(res => {
        if (res.payload.status === 200) {
          window.location.reload(); // TODO refactor to state
        } else {
          console.log('ERROR');
        }
      });
  };

  // TODO refactor PostComment to Cards
  render() {
    const { comments, parentId } = this.props;
    const COMMENT_FORM_URL = `/posts/${parentId}/comments/new`;

    if (!comments) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <Row>
          <Col className="col-xs-4">
            <div className="text-xs-right">
              <Link className="btn btn-success float-right" to={COMMENT_FORM_URL}>
                Click this button to add a new comment
              </Link>
            </div>
          </Col>
        </Row>

        <br/>
        { (comments.length === 0) ? <h4>This post needs a comment!!!</h4> :
        <div>
          <h4>Comments for this post:</h4>
          <CardDeck>
            {comments.map(comment =>
              <Card key={comment.id}>
                <CardBody>
                  <CardTitle className="text-primary">{comment.title}</CardTitle>
                  <CardSubtitle className="text-success">
                    Author: {comment.author}
                  </CardSubtitle><br/>
                  <CardText>Body: {comment.body}</CardText>
                  <CardText>Published Date: <Moment unix>{comment.timestamp}</Moment></CardText>
                  <Votes id={comment.id} />
                  <CardText className="text-danger">Votes: {comment.voteScore}</CardText>
                  <Link to={`/posts/${comment.parentId}/comments/${comment.id}/edit`}>
                    <Button color="warning">Edit Post</Button>
                  </Link>{' '}
                  <Button
                    color="danger"
                    data-message={comment.id}
                    onClick={this.onDeleteComment}>
                    Delete Post
                  </Button>
                </CardBody>
              </Card>
            )}
          </CardDeck>
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments: comments.comments };
}

export default connect(mapStateToProps, { deleteComment })(PostComment);
