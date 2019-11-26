import React, { BaseSyntheticEvent } from 'react';
import './Comment.css';
import CommentService from '../../services/comment.service';
import { map } from 'lodash';
import { AuthService } from '../../services/auth.service';
import InputBox from './components/InputBox';
import SingleComment from './components/SingleComment';
import LoadingSpinner from '../../_shared-components/LoadingSpinner';
import { reverseMap } from '../../utils/reverseMap';

interface State {
  comments: any[],
  isLoaded: boolean;
  newComment: string;
  submitButtonDisabled: boolean;
}

interface Props {
}

class Comments extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      comments: [],
      isLoaded: false,
      newComment: '',
      submitButtonDisabled: false
    }

  }

  componentDidMount = async () => {
    try {
      const comments = await CommentService.getComments();
      this.setState({
        comments,
        isLoaded: true
      });
    } catch(e) {
      alert(e.message);
    }
  }

  handleChange = (event: BaseSyntheticEvent) => {
    this.setState({
      newComment: event.target.value
    });
  }

  onSubmitInputClick = async () => {
    if(this.state.newComment === '') {
      return;
    }
    this.setState({
      submitButtonDisabled: true
    });

    try{
      const comment = await CommentService.postComment({
        text: this.state.newComment,
        userId: AuthService.user.id
      });

      this.setState({
        newComment: '',
        comments: this.state.comments.concat([comment]),
        submitButtonDisabled: false
      });

    } catch(e) {
      alert(e);
      this.setState({
        submitButtonDisabled: false
      });
    }
  }



  render() {

    if(!this.state.isLoaded) {
      return <LoadingSpinner />;
    }

    const comments = reverseMap(this.state.comments, (comment, index) => {
      return <SingleComment comment={comment} key={index} />
    })

    return (
      <div>
        <div>
          <InputBox
            rows={3}
            onChange={this.handleChange}
            onSubmitClick={this.onSubmitInputClick}
            value= {this.state.newComment}
            btnDisable={this.state.submitButtonDisabled}
          />
        </div>
        <div className='comments'>
          {comments}
        </div>
      </div>
    );
  }

}

export default Comments;
