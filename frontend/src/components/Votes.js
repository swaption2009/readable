import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postVote, commentVote } from '../actions'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

class Votes extends Component {
  onThumbsUp = () => {
    const vote = { 'option': 'upVote'}
    this.onSendVote(vote)
  }

  onThumbsDown = () => {
    const vote = { 'option': 'downVote'}
    this.onSendVote(vote)
  }

  onSendVote = (vote) => {
    this.props.postVote(this.props.id, vote)
    this.props.commentVote(this.props.id, vote)
    window.location.reload()
  }

  render() {
    return (
      <div>
        <FaThumbsOUp size={50} onClick={this.onThumbsUp} />
        <FaThumbsODown size={50} onClick={this.onThumbsDown}/>
      </div>
    )
  }
}

export default connect(null, { postVote, commentVote })(Votes)