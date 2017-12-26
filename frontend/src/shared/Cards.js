import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from 'reactstrap';
import Moment from 'react-moment';
import Votes from './Votes';
import PropTypes from 'prop-types';

const Deck = (props) => {
  // TODO handle Post vs Comment UI differences, ie. Title and Comment Count
  // TODO thumbs up & down Redux store
  // TODO implement Edit & Delete Post or Comment

  return (
    <div>
      <CardDeck>
      {props.posts.map(post =>
        <Card key={post.id}>
          <CardImg top width="100%" src="http://placekitten.com/g/256/180" alt="Card image cap"/>
          <CardBody>
            <CardTitle
              className="text-primary"
              onClick={() => props.onCardSelected({ post })}>
              {post.title}
            </CardTitle>
            <CardSubtitle className="text-success">Author: {post.author}</CardSubtitle>
            <CardText>{post.body}</CardText>
            <CardText className="text-warning">Comment Count: {post.commentCount}</CardText>
            <CardText className="text-danger">Votes: {post.voteScore}</CardText>
            <Votes
              postId={post.id}
              postVotes={post.voteScore} />
            <CardText>Published Date: <Moment unix>{post.timestamp}</Moment></CardText>
            { !post.category ?
              <div></div> :
              <Badge color="secondary">category: {post.category}</Badge>
            }
            <br/>
            <Link to="/">
              <Button color="warning">Edit</Button>
            </Link>{' '}
            <Button
              color="danger"
              data-message={post.id}
              onClick={this.onDeleteComment}>
              Delete
            </Button>
          </CardBody>
        </Card>
      )}
      </CardDeck>
    </div>
  );
};

Deck.propTypes = {
  props: PropTypes.object,
};

export default Deck;
