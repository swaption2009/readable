import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux'
import {fetchCategories} from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <Container sz="lg">
        TODO iterate categories from redux store and replace ButtonGroup below
        <Row>
          <ButtonGroup>
            <Button>React</Button>{' '}
            <Button>Redux</Button>{' '}
            <Button>Udacity</Button>
          </ButtonGroup>
        </Row>

        <Row>
          <Col>
            hello world
          </Col>
        </Row>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
