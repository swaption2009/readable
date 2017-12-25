import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVote, commentVote } from '../actions/index';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

class Votes extends Component {
  onThumbsUp = () => {
    const id = this.props.postId;
    const vote = { 'option': 'upVote' };
    this.onSendVote(id, vote);
  };

  onThumbsDown = () => {
    const id = this.props.postId;
    const vote = { 'option': 'downVote' };
    this.onSendVote(id, vote);
  };

  onSendVote = (id, vote) => {
    this.props.postVote(id, vote)
      .then(res => {
        if (res.payload.status === 200) {
          console.log('POST VOTED SUCCESSFULLY');
        } else {
          console.log('POST VOTE ERROR');
        }
      });
    this.props.commentVote(id, vote)
      .then(res => {
      if (res.payload.status === 200) {
        console.log('COMMENT VOTED SUCCESSFULLY');
      } else {
        console.log('COMMENT VOTE ERROR');
      }
    });;
    window.location.reload();
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

export default connect(
  null,
  { postVote, commentVote })(Votes);
