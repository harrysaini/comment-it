import Comment, { ICommentFields }  from '../models/comment.model';
import _ from 'lodash';
import User from '../models/user.model';


class CommentDAO {


  static async findCommentByID(id: number) {
    const comment = await Comment.findByPk(id);
    return comment;
  }

  static async addComment(obj: ICommentFields) {
    const comment = await Comment.create(obj);
    return comment;
  }

  static async getComments() {
    const comments = Comment.findAll({
      where: {
        level: 1
      },
      include: [{
        model:User,
        attributes: {
          exclude: User.exclude
        }
      }]
    });
    return comments;
  }

  static async addReplies(comments: Comment[]): Promise<Comment[]> {
    const commentsWithReplies = await Promise.all(_.map(comments, async (comment) => {
      const replies = await Comment.findAll({
        where: {
          replyTo: comment.id
        },
        include: [{
          model:User,
          attributes: {
            exclude: User.exclude
          }
        }]
      });
      const repliesExtended: Comment[] = await CommentDAO.addReplies(replies);
      comment = comment.toJSON() as Comment;
      const commentsWithReplies = _.extend(comment, {
        replies: repliesExtended
      });
      return commentsWithReplies;
    }));

    return commentsWithReplies;
  }

}

export default CommentDAO;
