import { ISignupRequest, LoginRequest, ILoginResponseObject } from "./auth.types";
import config from 'config';
import UserDAO from "../../dao/user.dao";
import jwt from 'jsonwebtoken';
import _ from "lodash";
import User from "../../models/user.model";

const jwtSecret = config.get('jwtSecret') as string;

class AuthModel {
  static async signup(options: ISignupRequest) {
    const user = await UserDAO.createUser(options);
    return user;
  }

  static async login(options: LoginRequest): Promise<ILoginResponseObject> {
    const user = await UserDAO.find(options);
    if(!user) {
      throw new Error('Incorrect username or password');
    }

    const userToken = jwt.sign({id: user.id, username: user.username}, jwtSecret, {expiresIn: '1 days'});

    return {
      user,
      token: userToken
    }
  }

}

export default AuthModel;
