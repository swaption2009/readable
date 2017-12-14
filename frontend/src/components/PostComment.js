import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap'
import Votes from "./Votes"
import { Link } from 'react-router-dom'

class PostComment extends Component{
  // TODO edit comment
  // TODO delete comment

  render() {
    const { comments, parentId } = this.props
    const COMMENT_FORM_URL = `/posts/${parentId}/comments/new`

    if (!comments) {
      return <div>Loading...</div>
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
                  <CardSubtitle className="text-success">Author: {comment.author}</CardSubtitle><br/>
                  <CardText>{comment.body}</CardText>
                  <CardText className="text-danger">Votes: {comment.voteScore}</CardText>
                  <CardText>{comment.timestamp}</CardText>
                  <Votes id={comment.id}/>
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