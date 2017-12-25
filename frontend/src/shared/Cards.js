import React from 'react';
import {
  Badge,
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

// TODO show edit / delete button
// TODO thumbs up / down mechanism

const Deck = (props) => {
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
            <Badge color="secondary">category: {post.category}</Badge>
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
