import React, { Component } from 'react'
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import PostsIndex from './PostsIndex'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  onCategorySelected = (category) => {
    console.log('This category is clicked:', category.category.name)
    // TODO create a filter function to show Post index page by category
  }

  render() {
    const categories = this.props.categories
    // console.log(categories)

    return (
      !categories ? <div>Loading...</div> :
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
          </ButtonGroup>
        </Row>
        <br/>
        <Row>
          {/*TODO complete onCategorySelected function to be passed to PostsIndex */}
          <PostsIndex/>
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
