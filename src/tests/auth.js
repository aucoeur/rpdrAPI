const app = require("../server");
const mongoose = require('mongoose');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require("chai-http");
const User = require('../models/user');

chai.config.includeStack = true;

chai.use(chaiHttp);
const assert = chai.assert;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

sampleUser = {
  username: 'testuser1',
  password: 'somepassword'
}

describe('User Auth', () => {
  afterEach((done) => {
    User.findOneAndRemove({username: 'testuser1'})
      .then(() => done())
  })

  it('should be able to sign up', (done) => {
    chai.request(app)
      .post('/signup')
      .send(sampleUser)
      .then(res => {
        assert.equal(res.status, 200)
        assert.exists(res.body.jwttoken)

        User.find({username: 'testuser1'}).then(result => {
          assert.equal(result.length, 1)
        })
        return done()
      }).catch(err => {
        return done(err)
      })
  })

  it('should be able to log in', (done) => {
    let user = new User(sampleUser)
    user.save().then(savedUser => {
      chai.request(app)
        .post('/login')
        .send(sampleUser)
        .then(res => {
          console.log(res.body)
          assert.equal(res.status, 200)
          assert.exists(res.body.jwttoken)
          return done()
        }).catch(err => {
          console.log(err)
          return done(err)
        })
    })
  })
});