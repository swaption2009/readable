import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import {
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import sortBy from 'sort-by';
import Cards from '../shared/Cards';

class PostsIndex extends Component {
  state = {
    openDropdownMenu: false,
    sortFilter: '',
  };
  componentDidMount() {
    this.props.fetchPosts();
  };

  onCardSelected = (e) => {
    this.props.history.push(`/${e.post.category}/${e.post.id}`);
  };

  toggle = () => {
    this.setState({
      openDropdownMenu: !this.state.openDropdownMenu,
    });
  };

  selectedSortby = (e) => {
    this.setState({
      sortFilter: e,
    });
  };

  render() {
    const { posts, filter } = this.props;
    const { sortFilter } = this.state;
    if (!posts) {
      return <div>Loading...</div>;
    }

    let filteredPosts;
    if (filter) {
      filteredPosts = posts.filter(post => post.category === filter);
    } else {
      filteredPosts = posts;
    }

    let sortedPosts = filteredPosts;
    sortedPosts.sort(sortBy(sortFilter));

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
          <ButtonDropdown
            isOpen={this.state.openDropdownMenu}
            toggle={this.toggle}
          >
            <DropdownToggle caret>
              Sort posts by:
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.selectedSortby('title')}>
                Title
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.selectedSortby('author')}>
                Author
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.selectedSortby('timestamp')}>
                Published Date
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Row>
        <br/>

        <Row>
          <div className="text-xs-right">
            <button className="btn btn-info float-left">
              Info: click "Title" to "Edit" & "Delete" post & its comments
            </button>
          </div>
        </Row>
        <br/>

        <Cards
          posts={sortedPosts}
          onCardSelected={(e) => this.onCardSelected(e)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsIndex));
