# comment-it

## Built using

### server

1. Node js
2. Typescript
3. postres SQL
4. sequlize ORM
5. Express
6. Passport-JWT

###### implementation
1. REST api for adding and editing comment
2. REST api for getting all comments with nested replies.
3. Rest Api for USER auth (login/signup)
3. JWT for authentication on server.

### client

1. React js
2. Typescript
3. bootstrap 4

###### implementation
1. Index page
2. Login page
3. Comment page only accesible by login

### how to deploy

1. Set up postresSQL db
2. Add database config vars (db_name, db_password, user) to config file in server folder
3. Install nodejs v 10+ and npm 
3. run command `npm intalll`
4. run command `npm start`

### assumptions/constraints
1. Comments by other users updated on refresh, real time not implemented.
2. Max recursive level of replies is set as 5. It can be any level, but for smooth UI(mobile also) i have set it to 5 levels.
3. Only user can edit there comment.

### improvements

1. Realtime via sockets
2. Redux for data store in client side
