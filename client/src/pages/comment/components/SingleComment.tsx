import React from 'react';
import Replies from './Replies';

interface Props {
  comment: any;
}

const SingleComment: React.FunctionComponent<Props> = (props: Props) => {

  const comment = props.comment;

  return (
    <div className="comment">
      <div className="d-flex ">
        <div>
          <img
            height="50px"
            width="50px"
            className="img-fluid"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQk4Lw8zSVdKxa7mRd_hZfY8mx1-ieO6P9m4nHMq63b77e2iecU"
          />
        </div>
        <div className="comment-data">
          <div className="comment-info">
            <div className="user-name">
              {comment.user.username}
            </div>
            <div className="date">
              {comment.createdAt}
            </div>
          </div>
          <div className="comment-text">
            {comment.text}
          </div>
          <div className="comment-actions">
            <div className="edit link-btn">
              Edit
            </div>
            <div className="reply link-btn">
              Reply
            </div>
          </div>
          <hr/>
          <Replies replies={comment.replies}/>
        </div>
      </div>
    </div>

  );

}

export default SingleComment;
