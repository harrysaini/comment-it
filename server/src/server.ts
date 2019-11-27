import app from './libs/express';
import sequelize, { checkConnection } from './libs/sequelize';
import './models/loadModels';
import {  addUserToDb } from './utils/dbSetup';

const port = app.get('port');

const setServer = async () => {
  await sequelize.sync(
    // {force: true}
  );

  await addUserToDb();
}

setServer().then(() => {
  app.listen(port, () => {
    console.log('comment-it:server:' +  `Listening on ${port}`);
  });
});


