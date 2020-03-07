require('dotenv').config()
const app = require("../server")
const mongoose = require('mongoose')
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require("chai-http")
const jwt = require('jsonwebtoken')
// const expect = chai.expect;
const assert = chai.assert

const User = require('../models/user')
const Queen = require('../models/queen')

chai.config.includeStack = true

chai.should()
chai.use(chaiHttp)


// Sample User
const user = {
  username: 'test_user1', 
  password: 'itsasecret'
}

// Sample MS Queen
const sampleQueen = {
  name: 'Willam',
  govtname: 'Willam Belli',
  birthdate: '1982-06-30T00:00:00.000Z'
}

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  chai.request(app).close()
  done();
});



describe('Queen API endpoints', () => {
  beforeEach((done) => {
    chai.request(app)
        .post('/signup')
        .set('content-type', 'application/json')
        .send(user)
        .then(function (res) {
            done()
        })
        .catch(function (err) {
            done(err)
        })
  })

  afterEach((done) => {
    User.findOneAndRemove({username: 'test_user1'})
    .then(() => {
      Queen.findOneAndRemove({name: 'Willam'})
      .then(() => done())
    })
  })

  // Test GET All Queens
  it('should show all queens', (done) => {
    let queen = new Queen(sampleQueen);
    queen.save().then(() => {
      chai.request(app)
        .get('/api/queen/all')
        .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          assert.equal(res.status, 200)
          assert.isArray(res.body)
          return done()
        })
    })
  })

  it('should show a specific queen', (done) => {
    let queen = new Queen(sampleQueen);
    queen.save().then((savedQueen) => {
      chai.request(app)
        .get(`/api/queen/${savedQueen._id}`)
        // .set('authorization', 'Bearer ' + process.env.TOKEN)
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200)
          assert.equal(res.body.name, 'Willam')
          assert.equal(res.body.govtname, 'Willam Belli')
          assert.equal(res.body.birthdate, '1982-06-30T00:00:00.000Z')
          return done()
        })
    })
  })

  it('should POST a new queen', (done) => {
    chai.request(app)
        .post('/api/season/5e5d8107b99afea2ec5c91b3/queen')
        .set('authorization', 'Bearer ' + process.env.TOKEN)
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .send(sampleQueen)
        .then(res => {
            assert.equal(res.status, 200)
            assert.equal(res.body.name, 'Willam')
            assert.equal(res.body.govtname, 'Willam Belli')
            assert.equal(res.body.birthdate, '1982-06-30T00:00:00.000Z')
            assert.isNotEmpty(res.body._id)

        // make sure data actually got added to the database
        Queen.find({name: 'Willam'}).then(result => {
          assert.equal(result.length, 1)
        })

        return done()
      }).catch(err => {
        return done(err)
      })
  })

    it("Should be able to delete a Queen", (done) => {
        let queen = new Queen(sampleQueen);
        queen.save().then((savedQueen) => {
            chai.request(app)
                .delete(`/api/season/5e5d8107b99afea2ec5c91b3/queen/${savedQueen._id}`)
                .end((err, res) => {
                    if (err) {return done(err)};
                    res.status.should.be.equal(200);
                    return done();
                });
        })
    });
})