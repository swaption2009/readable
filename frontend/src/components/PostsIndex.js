import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts} from '../actions'
import { Row, Col, Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  onCardSelected = (e) => {
    this.props.history.push(`/posts/${e.post.id}`)
  }

  render() {
    const { posts, filter } = this.props

    if (!posts) {
      return <div>Loading...</div>
    }

    let filteredPosts
    if (filter) {
      filteredPosts = posts.filter(post => post.category === filter)
    } else {
      filteredPosts = posts
    }

    // TODO implement sort-by

    return (
      <div>
        <Row>
          <Col className="col-xs-4">
            <div className="text-xs-right">
              <Link className="btn btn-success float-right" to="/posts/new">
                Click this button to add a new post
              </Link>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <div className="text-xs-right">
            <button className="btn btn-info float-left">
              Info: click inside the card to see post details
            </button>
          </div>
        </Row>
        <br/>

        <CardDeck>
          {filteredPosts.map(post =>
            <Card key={post.id} onClick={() => this.onCardSelected({post})}>
              <CardImg top width="100%" src="http://placekitten.com/g/256/180" alt="Card image cap"/>
              <CardBody>
                <CardTitle className="text-primary">{post.title}</CardTitle>
                <CardSubtitle className="text-success">Author: {post.author}</CardSubtitle><br/>
                <CardText>{post.body}</CardText>
                <CardText className="text-danger">Votes: {post.voteScore}</CardText>
                <CardText>{post.timestamp}</CardText>
                <Button outline color="primary">category: {post.category}</Button>
              </CardBody>
            </Card>
          )}
        </CardDeck>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.posts }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsIndex))