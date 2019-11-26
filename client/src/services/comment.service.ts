import { config } from '../config';
import { each } from 'lodash';
import { AuthService } from './auth.service';

const getCommentsUrl = config.apiUrl + '/api/v1/comments';
const postCommentUrl = config.apiUrl + '/api/v1/comment';

const headers = {
  //...AuthService.getAuthHeaders(),

  "Content-type": "application/json"
}

interface ICommentPostRequest {
  text: string;
  userId: number;
  replyTo?: number;
}

class CommentService {

  static async getComments(): Promise<any[]> {
    try {
      const resp = await fetch(getCommentsUrl, {
        method: 'get',
      });

      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }

      const comments =  response.data;
      return comments;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

  static async postComment(obj: ICommentPostRequest): Promise<any> {
    try {
      const resp = await fetch(postCommentUrl, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(obj)
      });

      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }

      const comment =  response.data;
      comment.user = AuthService.user;
      return comment;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

}

export default CommentService;
