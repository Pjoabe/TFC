import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;
import { app } from '../app';
import { Response } from 'superagent';
import match from '../database/models/match';
import {
  allMatches,matchesInProgress,notInProgress,newMatch,newResult
} from './mocks/matches.mock';
import { user, TOken } from './mocks/login.mock';
chai.use(chaiHttp);

describe('/matches route tests', function () {
  it('should return status 422 and a message', async () => {
    sinon.stub(match, 'findAll').resolves([newMatch] as any);
    sinon.stub(match, 'create').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => user);
    const res: Response = await chai.request(app).post('/matches').send(newMatch).set('Authorization', TOken);

    expect(res.status).to.be.equal(422);

    expect(res.body).to.be.deep.equal({"message": "It is not possible to create a match with two equal teams"});
  });

  it('should return status 200 and all the matches', async () => {
    sinon.stub(match, 'findAll').resolves(allMatches as any);
    const res: Response = await chai.request(app).get('/matches');

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal(allMatches);
  });

  it('should return status 200 and all matches in progress', async () => {
    sinon.stub(match, 'findAll').resolves(matchesInProgress as any);
    const res: Response = await chai.request(app).get('/matches?inProgress=true');

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal(matchesInProgress);
  });

  it('should return status 200 and update the match', async () => {
    sinon.stub(match, 'update').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => user);
    const res: Response = await chai.request(app).patch('/matches/36').send({
      "homeTeamGoals": 5,
      "awayTeamGoals": 4
    }).set('Authorization', TOken);

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Should return status 200 and all matches that are not in progress', async () => {
    sinon.stub(match, 'findAll').resolves(notInProgress as any);
    const res: Response = await chai.request(app).get('/matches?inProgress=false');

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal(notInProgress);
  });

  it('should return status 200 and finish the match', async () => {
    sinon.stub(match, 'update').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => user);
    const res: Response = await chai.request(app).patch('/matches/36/finish').send().set('Authorization', TOken);

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal({ "message": "Finished" });
  });

  
  it('should create a new match and return status 200', async () => {
    sinon.stub(match, 'findAll').resolves([newMatch] as any);
    sinon.stub(match, 'create').resolves(newResult as any);
    sinon.stub(jwt, 'verify').callsFake(() => user);
    const res: Response = await chai.request(app).post('/matches').send(newMatch).set('Authorization', TOken);

    expect(res.status).to.be.equal(201);

    expect(res.body).to.be.deep.equal(newResult);
  });

  it('should return status 404 when an invalid id is inserted', async () => {
    sinon.stub(match, 'findAll').resolves();
    sinon.stub(match, 'create').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => user);
    const res: Response = await chai.request(app).post('/matches').send(newMatch).set('Authorization', TOken);

    expect(res.status).to.be.equal(404);

    expect(res.body).to.be.deep.equal( {"message": "There is no team with such id!"});
  });

  afterEach(()=>{ sinon.restore() });
});