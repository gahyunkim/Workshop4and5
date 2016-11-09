import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = {reactKey: this.props.reactKey,
      postID: props.postID, author: props.author,
      postDate: props.postDate, likeCounter: props.likeCounter
    };
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
      };
      if (this.didUserLike()) {
        unlikeComment(this.state.postID, 4, callbackFunction, this.state.reactKey);
      } else {
        likeComment(this.state.postID, 4, callbackFunction, this.state.reactKey);
      }
    }
  }

  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }


  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()){
      likeButtonText = "Unlike";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>
            {this.props.author.fullName}
          </Link> {this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>
            {likeButtonText}
          </a> · <a href="#">Reply</a> ·
          {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
