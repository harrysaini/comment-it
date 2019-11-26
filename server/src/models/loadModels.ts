import User from './user.model';
import Comment from './comment.model';
import * as _ from 'lodash';

const Models = {
  User,
  Comment
}


_.each(Models, (Model) => {
  Model.associate(Models);
});
