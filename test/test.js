const assert = require('assert');
const http = require('http');
const { ready, notReady, alive, dead, server } = require('../');

const location = 'http://localhost:3000';

describe('server', () => {
  before(() => {
    server.listen(3000, () => console.log());
  });

  it("should return 400 on path that doesn't exist", done => {
    http.get(`${location}/jdowjda`, res => {
      assert.equal(400, res.statusCode);
      done();
    });
  });

  it('should return 500 on /ready', done => {
    http.get(`${location}/ready`, res => {
      assert.equal(500, res.statusCode);
      done();
    });
  });

  it('should return 500 on /live', done => {
    http.get(`${location}/live`, res => {
      assert.equal(500, res.statusCode);
      done();
    });
  });

  it('should return 200 on /ready after ready() called', done => {
    ready();
    http.get(`${location}/ready`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return 200 on /live after alive() called', done => {
    alive();
    http.get(`${location}/live`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return 500 on /ready after notReady() called', done => {
    notReady();
    http.get(`${location}/ready`, res => {
      assert.equal(500, res.statusCode);
      done();
    });
  });

  it('should return 500 on /live after dead() called', done => {
    dead();
    http.get(`${location}/live`, res => {
      assert.equal(500, res.statusCode);
      done();
    });
  });

  it('should return 500 and msg on /ready after notReady() called', done => {
    let msg = 'something went wrong';
    let data = '';
    notReady(msg);
    http.get(`${location}/ready`, res => {
      assert.equal(500, res.statusCode);
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        assert.equal(msg, data);
        done();
      });
    });
  });

  it('should return 500 and msg on /live after dead() called', done => {
    let msg = 'something went wrong';
    let data = '';
    dead(msg);
    http.get(`${location}/live`, res => {
      assert.equal(500, res.statusCode);
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        assert.equal(msg, data);
        done();
      });
    });
  });

  after(() => server.close());
});
