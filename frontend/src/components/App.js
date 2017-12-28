import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import PostsIndex from './PostsIndex';

class App extends Component {
  state = {
    filter: '',
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  onCategorySelected = (category) => {
    this.setState({
      filter: category.category.name,
    });
    this.props.history.push(`${category.category.name}`);
  };

  resetPage = () => {
    this.setState({
      filter: '',
    });
    this.props.history.push('/');
  };

  render() {
    const categories = this.props.categories;

    if (!categories) {
      return <div>Loading...</div>;
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
                      onClick={() => this.onCategorySelected({ category })}>
                {category.name}
              </Button>
            )}
            <Button onClick={this.resetPage} outline color="danger">Show All</Button>
          </ButtonGroup>
        </Row>
        <br/>
        <Row>
          <PostsIndex filter={this.state.filter}/>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
