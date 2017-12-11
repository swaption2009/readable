import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts} from '../actions'
import { Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  onCardSelected = (e) => {
    console.log('this post id is clicked:', e.post.id)
  }

  render() {
    const { posts, filter } = this.props

    if (!posts) {
      return <div>Loading...</div>
    }

    let filteredPosts

    if (filter) {
      filteredPosts = posts.filter(post => post.category == filter)
    } else {
      filteredPosts = posts
    }

    // TODO implement sort by
    // TODO implement PostDetail component

    return (
      <div>
        <Alert color="success">Click card to see post detail</Alert>
        <CardDeck>
          {filteredPosts.map(post =>
            <Card key={post.id} onClick={() => this.onCardSelected({post})}>
              <CardImg top width="100%" src="http://placekitten.com/g/256/180" alt="Card image cap"/>
              <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <CardSubtitle>Author: {post.author}</CardSubtitle>
                <CardText>{post.body}</CardText>
                <Button color="primary">{post.category}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex)