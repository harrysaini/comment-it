import { Request } from 'express';
import _ from 'lodash';


export interface IAddCommentRequestOptions {
  text: string;
  userId: number;
  replyTo?: number;
}


export class AddCommentRequestOptions implements IAddCommentRequestOptions {
  text: string;
  userId: number;
  replyTo?: number;

  constructor(req: Request) {
    this.userId = req.body && req.body.userId;
    this.text = req.body && req.body.text;
    this.replyTo = req.body && req.body.replyTo;

    if(!this.userId) {
      throw new Error('user id undefined');
    }

    if(!this.text) {
      throw new Error('text undefined');
    }
  }
}

export interface IEditCommentRequestOptions {
  text: string;
  commentId: number;
}

export class EditCommentRequestOptions implements IEditCommentRequestOptions {
  text: string;
  commentId: number;

  constructor(req: Request) {
    this.text = req.body && req.body.text;
    let commentId = req.params && req.params.id;
    this.commentId = parseInt(commentId, 10);
    if(_.isUndefined(this.commentId)) {
      throw new Error('comment id undefined');
    }

    if(!this.text) {
      throw new Error('text undefined');
    }
  }
}
