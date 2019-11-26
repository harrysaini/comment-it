import _ from "lodash";
;
import { areArrayEqual } from '../../utils/helpers';
import CommentDAO from '../../dao/comment.dao';
import { IAddCommentRequestOptions, IEditCommentRequestOptions } from "./comment.types";


class CommentModel {

  static async addComment(options: IAddCommentRequestOptions) {
    let level = 1;
    if(!_.isUndefined(options.replyTo)) {
      const replyingToComment = await CommentDAO.findCommentByID(options.replyTo);
      if(_.isUndefined(replyingToComment) || replyingToComment === null) {
        throw new Error('replyId not found');
      }
      level = replyingToComment.level + 1;
    }
    const comment = await CommentDAO.addComment({
      text: options.text,
      level: level,
      userId: options.userId,
      replyTo: options.replyTo as number
    });

    return comment;
  }


  static async getComments() {
    const comments = await CommentDAO.getComments();
    const commentsWithReplies = await CommentDAO.addReplies(comments);
    return commentsWithReplies;
  }

  static async editComment(options: IEditCommentRequestOptions) {
    const comment = await CommentDAO.findCommentByID(options.commentId);

    if(comment === null || _.isUndefined(comment)) {
      throw new Error('commentId not found');
    }

    return await comment.update({
      text: options.text
    });
  }




}


export default CommentModel;
