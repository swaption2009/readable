import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  postVote,
  commentVote,
  fetchPost
} from '../actions/index';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

class Votes extends Component {
  onThumbsUp = () => {
    const id = this.props.postId;
    const vote = { 'option': 'upVote' };
    const type = this.props.type;
    this.onSendVote(id, vote,type);
  };

  onThumbsDown = () => {
    const id = this.props.postId;
    const vote = { 'option': 'downVote' };
    const type = this.props.type;
    this.onSendVote(id, vote, type);
  };

  onSendVote = (id, vote, type) => {
    // console.log(type);
    if (type === 'comment') {
      this.props.commentVote(id, vote)
        .then(res => {
          if (res.payload.status === 200) {
            console.log('COMMENT VOTED SUCCESSFULLY');
            this.props.fetchPost(res.payload.data.parentId);
          } else {
            console.log('COMMENT VOTE ERROR');
          }
        });
    } else {
      this.props.postVote(id, vote)
        .then(res => {
          if (res.payload.status === 200) {
            console.log('POST VOTED SUCCESSFULLY');
          } else {
            console.log('POST VOTE ERROR');
          }
        });
    }
  };

  render() {
    return (
      <div>
        <FaThumbsOUp
          size={50}
          onClick={() => this.onThumbsUp()} />
        <FaThumbsODown
          size={50}
          onClick={() => this.onThumbsDown()}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.posts,
    comments: state.comments.comments,
  };
};

export default connect(
  mapStateToProps,
  { postVote, commentVote, fetchPost })(Votes);
