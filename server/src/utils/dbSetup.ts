import User from '../models/user.model';


const usersArr = [
  {
    "username": "test",
    "password": "123"
  },
  {
    "username": "abc",
    "password": "1234"
  },
  {
    "username": "abc1",
    "password": "1234"
  },
  {
    "username": "abc2",
    "password": "1234"
  }
];


export const addUserToDb = async () => {
  const users = await User.findAll();
  if(users.length > 0) {
    return;
  }


  const promisesArr = usersArr.map(async (user: any) => {
    const userObj = await User.create({
      username: user.username,
      password: user.password,
    });

    return userObj;
  });

  await Promise.all(promisesArr);
}
