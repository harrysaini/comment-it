import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';

export interface ICommentFields {
  text: string;
  level: number;
  replyTo: number;
  userId: number;
}

class Comment extends Model implements ICommentFields {
  id!: number;
  text!: string;
  level!: number;
  replyTo!: number;
  userId!: number;

  static associate: (models: any) => void;

}
Comment.init({
  text: {
    type: Sequelize.STRING
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'comment'
});


Comment.associate = (models: any) => {
  Comment.belongsTo(models.User);
  Comment.hasMany(models.Comment, {
    as: 'reply',
    foreignKey: 'replyTo'
  });
}

export default Comment;
