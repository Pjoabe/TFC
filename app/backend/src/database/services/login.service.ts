import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import { newToken } from '../utils/token';

export default class LoginService {
  private _model: ModelStatic<User>;
  constructor(model: ModelStatic<User>) {
    this._model = model;
  }

  async login(email: string, password: string): Promise<string | boolean> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    if (!bcrypt.compareSync(password, user.dataValues.password)) {
      return 'Invalid password';
    }
    const { _password, ...payload } = user.dataValues;
    return newToken(payload);
  }
}
