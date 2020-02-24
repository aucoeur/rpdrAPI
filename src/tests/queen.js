require('dotenv').config()
const app = require("../server")
const mongoose = require('mongoose')
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require("chai-http")
const jwt = require('jsonwebtoken')
const assert = chai.assert

const User = require('../models/user')
const Queen = require('../models/queen')

chai.config.includeStack = true

chai.should()
chai.use(chaiHttp)

// Sample MS Queen
const sampleQueen = {
  name: 'Willam',
  govtname: 'Willam Belli',
  birthday: '1982-06-30',
}

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done();
});


describe('Queen API endpoints', () => {
  beforeEach((done) => {
    User.create({username: 'test_user1', password: 'itsasecret'})
    done()
  })

  afterEach((done) => {
    User.findOneAndRemove({username: 'test_user1'}).then(() => {
      Queen.findOneAndRemove({name: 'Willam'}).then(() => done())
    })
  })

  // Test GET All Queens
  it('should show all queens', (done) => {
    let queen = new Queen(sampleQueen);
    queen.save().then(() => {
      chai.request(app)
        .get('/queen/all')
        .set('jwttoken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
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
        .get(`/queen/${savedQueen._id}`)
        .set('jwttoken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .end((err, res) => {
          if (err) return done(err);

          assert.equal(res.body.name, 'Willam')
          assert.equal(res.body.govtname, 'Willam Belli')
          assert.equal(res.body.birthday, '1982-06-30T00:00:00.000Z')
          return done()
        })
    })
  })

  it('should POST a new queen', (done) => {
    chai.request(app)
      .post('/queen/create')
      .set('jwttoken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
      .send(sampleQueen)
      .then(res => {
        assert.equal(res.status, 200)
        assert.equal(res.body.name, 'Willam')
        assert.equal(res.body.govtname, 'Willam Belli')
        assert.equal(res.body.birthday, '1982-06-30T00:00:00.000Z')
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
})