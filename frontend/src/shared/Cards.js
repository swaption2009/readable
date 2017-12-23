import React from 'react';
import {
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
  return (
    <div>
      <CardDeck>
      {props.posts.map(post =>
        <Card key={post.id} onClick={() => props.onCardSelected({post})}>
          <CardImg top width="100%" src="http://placekitten.com/g/256/180" alt="Card image cap"/>
          <CardBody>
            <CardTitle className="text-primary">{post.title}</CardTitle>
            <CardSubtitle className="text-success">Author: {post.author}</CardSubtitle><br/>
            <CardText>Body: {post.body}</CardText>
            <CardText className="text-danger">Votes: {post.voteScore}</CardText>
            <Votes />
            <CardText>Published Date: <Moment unix>{post.timestamp}</Moment></CardText>
            <Button outline color="primary">category: {post.category}</Button>
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
