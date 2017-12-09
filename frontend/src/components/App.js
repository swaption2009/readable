import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux'
import {fetchCategories} from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  onCategorySelected(category) {
    console.log('I am clicked:', category.category.name)
    // TODO create a filter function to show Post index page by category
  }

  render() {
    const categories = this.props.categories
    // console.log(categories)

    return (
      !categories ? <div>Loading...</div> :
      <Container sz="lg">
        <Row>
          <ButtonGroup>
            {categories.map(category =>
              <Button key={category.name}
                  onClick={() => this.onCategorySelected({category})}>
                {category.name}
              </Button>
            )}
          </ButtonGroup>
        </Row>

        <Row>
          <Col>
            Add Posts Index here!
          </Col>
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
