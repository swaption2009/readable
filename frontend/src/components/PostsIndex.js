import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts} from '../actions'
import { Row, Col, Card, Button, CardImg, CardTitle,
  CardText, CardDeck, CardSubtitle, CardBody,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'
import Moment from 'react-moment'
import sortBy from 'sort-by'

class PostsIndex extends Component {
  state = {
    dropdownOpen: false,
    sortFilter: ''
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  onCardSelected = (e) => {
    this.props.history.push(`/posts/${e.post.id}`)
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  selectedSortby = (e) => {
    this.setState({
      sortFilter: e
    })
  }

  render() {
    const { posts, filter } = this.props
    const { sortFilter } = this.state

    if (!posts) {
      return <div>Loading...</div>
    }

    let filteredPosts
    if (filter) {
      filteredPosts = posts.filter(post => post.category === filter)
    } else {
      filteredPosts = posts
    }

    let sortedPosts = filteredPosts
    sortedPosts.sort(sortBy(sortFilter))

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
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Sort posts by:
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.selectedSortby('title')}>Title</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.selectedSortby('author')}>Author</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.selectedSortby('timestamp')}>Published Date</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
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
          {sortedPosts.map(post =>
            <Card key={post.id} onClick={() => this.onCardSelected({post})}>
              <CardImg top width="100%" src="http://placekitten.com/g/256/180" alt="Card image cap"/>
              <CardBody>
                <CardTitle className="text-primary">{post.title}</CardTitle>
                <CardSubtitle className="text-success">Author: {post.author}</CardSubtitle><br/>
                <CardText>Body: {post.body}</CardText>
                <CardText className="text-danger">Votes: {post.voteScore}</CardText>
                <CardText>Published Date: <Moment unix>{post.timestamp}</Moment></CardText>
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