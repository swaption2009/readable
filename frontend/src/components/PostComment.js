import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap'
import Votes from "./Votes";

class PostComment extends Component{
  // TODO add comment
  // TODO edit comment
  // TODO delete comment

  render() {
    const { comments } = this.props

    if (!comments) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <br/>
        <br/>
        { (comments.length === 0) ? <h4>This post needs a comment!!!</h4> :
        <div>
          <h4>Comments for this post:</h4>
          <CardDeck>
            {comments.map(comment =>
              <Card key={comment.id}>
                <CardBody>
                  <CardTitle className="text-primary">{comment.title}</CardTitle>
                  <CardSubtitle className="text-success">Author: {comment.author}</CardSubtitle><br/>
                  <CardText>{comment.body}</CardText>
                  <CardText className="text-danger">Votes: {comment.voteScore}</CardText>
                  {/* TODO format Unix timestamp */}
                  <CardText>{comment.timestamp}</CardText>
                  <Votes/>
                </CardBody>
              </Card>
            )}
          </CardDeck>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps( {comments }) {
  return { comments: comments.comments }
}

export default connect(mapStateToProps)(PostComment)