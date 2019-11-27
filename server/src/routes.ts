import { Router } from 'express';
import config from 'config';
import AuthController from './modules/auth/AuthController';
import passport from 'passport';
import CommentController from './modules/comment/commentController';

const apiRouter: Router = Router();

apiRouter.get('/v1/index', (req, res) => {
  res.send('hello from api');
  console.log(JSON.stringify(config));
});

apiRouter.post('/v1/auth/signup', AuthController.signUp);
apiRouter.post('/v1/auth/login', AuthController.login);
apiRouter.get('/v1/auth/me', passport.authenticate('jwt', {session: false}),  AuthController.getUser);


apiRouter.post('/v1/comment', passport.authenticate('jwt', {session: false}), CommentController.addComment);
apiRouter.put('/v1/comment/:id', passport.authenticate('jwt', {session: false}), CommentController.editComment);
apiRouter.get('/v1/comments', passport.authenticate('jwt', {session: false}), CommentController.getComments);

export default apiRouter;
