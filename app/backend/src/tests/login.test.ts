import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/User';
import { TOken, wrongLogin, login, user } from './mocks/login.mock';
import * as token from '../database/utils/token';

chai.use(chaiHttp);

describe('Login route tests', function () {
 
  it('should return an status 200 and the role requested', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    sinon.stub(token, 'verifyToken').returns(user);
    const res: Response = await chai.request(app).get('/login/role').set({ 'Authorization': TOken });

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal({ role: "admin" });
  });

  it('should return status 400 and a warning message', async () => {
    const res: Response = await chai.request(app).post('/login').send();

    expect(res.status).to.be.equal(400);

    expect(res.body).to.be.deep.equal({ "message": "All fields must be filled" });
  });

  it('should return status 200 and a token', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    const res: Response = await chai.request(app).post('/login').send(login);

    expect(res.status).to.be.equal(200);

    expect(res.body).to.have.key('token');
    
    expect(res.body.token).to.be.a('string');
  });

  it('should return an error about the wrong email and password', async () => { 
    const res: Response = await chai.request(app).post('/login').send(wrongLogin);

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({"message": "Invalid email or password" });
  });

  it('should return status 401 and a message about the token', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    const res: Response = await chai.request(app).get('/login/role');

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Token not found' });
  });

  afterEach(()=>{ sinon.restore() });
});