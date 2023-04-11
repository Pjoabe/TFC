import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;
import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';
import { expectedResult } from './mocks/teams.mock';
chai.use(chaiHttp);

describe('route team tests', function () {
  it('should return status 404 and a message', async () => {
    sinon.stub(Team, 'findByPk').resolves();
    const res: Response = await chai.request(app).get('/teams/666');

    expect(res.status).to.be.equal(404);

    expect(res.body).to.be.deep.equal({ "message": "Id not found" });
  });

  it('should return status 200 and all teams', async () => {
    sinon.stub(Team, 'findAll').resolves(expectedResult as Team[]);
    const res: Response = await chai.request(app).get('/teams');

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal(expectedResult);
  });

  it('should return status 200 when searching for an id', async () => {
    sinon.stub(Team, 'findByPk').resolves(expectedResult[4] as Team);
    const res: Response = await chai.request(app).get('/teams/4');

    expect(res.status).to.be.equal(200);
    
    expect(res.body).to.be.deep.equal(expectedResult[4]);
  });

  afterEach(()=>{ sinon.restore() });
});