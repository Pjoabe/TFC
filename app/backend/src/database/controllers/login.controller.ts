import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import { verifyToken } from '../utils/token';

export default class LoginController {
  private _service: LoginService;
  private _role: string;
  constructor(service: LoginService) {
    this._service = service;
    this._role = '';
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const token = await this._service.login(email, password);
    if (token === 'Invalid email or password') {
      return res.status(401).json({ message: token });
    }
    return res.status(200).json({ token });
  }

  async role(req: Request, res: Response) {
    const token: any = req.header('Authorization');
    const checkToken: any = verifyToken(token);
    if (!checkToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    this._role = await checkToken.role;
    return res.status(200).json({ role: this._role });
  }
}
