import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deleteComment } from '../actions';
import Cards from '../shared/Cards';

const PostComment = (props) => {
  const { comments, parentId, category } = props;
  const COMMENT_FORM_URL = `/${category}/${parentId}/comments/new`;

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
          <Cards
            posts={comments}
            type="comment"
            onCardSelected={(e) => this.onCardSelected(e)}
          />
        </div>
      }
    </div>
  );
};

function mapStateToProps({ comments }) {
  return { comments: comments.comments };
}

export default connect(
  mapStateToProps,
  { deleteComment }
  )(PostComment);
