import { Request, Response } from 'express';
import config from 'config';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/Status';
import { GenericResponse, IGenericResponse } from '../../utils/GenericResponse';
import { AddCommentRequestOptions, EditCommentRequestOptions } from './comment.types';
import CommentModel from './commentModel';
import Comment from '../../models/comment.model';

class CommentController {

  static async addComment(req: Request, res: Response) {
    try {
      const options = new AddCommentRequestOptions(req);
      const comment: Comment = await CommentModel.addComment(options);
      const response = new GenericResponse<Comment>(RESPONSE_STATUS.SUCCESS, 'Success', comment);
      res.json(response);
    } catch (err) {
      console.log(err);
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }


  static async getComments(req: Request, res: Response) {
    try {
      const comments: Comment[] = await CommentModel.getComments();
      const response = new GenericResponse<Comment[]>(RESPONSE_STATUS.SUCCESS, 'Success', comments);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async editComment(req: Request, res: Response) {
    try {
      const options = new EditCommentRequestOptions(req);
      const comment: Comment = await CommentModel.editComment(options);
      const response = new GenericResponse<Comment>(RESPONSE_STATUS.SUCCESS, 'Success', comment);
      res.json(response);
    } catch (err) {
      console.log(err);
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }


}

export default CommentController;
