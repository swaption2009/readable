import React, { Component } from 'react'
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import PostsIndex from './PostsIndex'

class App extends Component {
  state = {
    filter: ''
  }
  componentDidMount() {
    this.props.fetchCategories()
  }

  onCategorySelected = (category) => {
    // console.log('This category is clicked:', category.category.name)
    this.setState({
      filter: category.category.name
    })
  }

  resetPage = () => {
    window.location.reload()
  }

  render() {
    const categories = this.props.categories
    // console.log(categories)

    if (!categories) {
      return <div>Loading...</div>
    }

    return (
      <Container sz="lg">
        <br/>
        <Row>
          <h4><Col>Select category to filter posts: </Col></h4>
          <ButtonGroup>
            {categories.map(category =>
              <Button key={category.name}
                      outline color="primary"
                      onClick={() => this.onCategorySelected({category})}>
                {category.name}
              </Button>
            )}
            <Button onClick={this.resetPage} outline color="danger">Show All</Button>
          </ButtonGroup>
        </Row>
        <br/>
        <Row>
          {/*TODO complete onCategorySelected function to be passed to PostsIndex */}
          <PostsIndex filter={this.state.filter}/>
        </Row>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.categories)
  return { categories: state.categories.categories };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
