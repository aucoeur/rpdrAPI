require('dotenv').config()
const app = require("../server")
const mongoose = require('mongoose')
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require("chai-http")
const jwt = require('jsonwebtoken')
// const expect = chai.expect;
const assert = chai.assert

const User = require('../models/user')
const Season = require('../models/season')

chai.config.includeStack = true

chai.should()
chai.use(chaiHttp)


// Sample User
const user = {
  username: 'test_user1', 
  password: 'itsasecret'
}

// Sample Season
const sampleSeason = {
    seriesType: "Regular",
    seasonNumber: 7,
    premiereDate: "2015-03-02T00:00:00.000Z",
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

describe('Season API endpoints', () => {
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
      Season.findOneAndRemove({seriesType: 'Regular', seasonNumber: 7})
      .then(() => done())
    })
  })

  // Test GET All Seasons
  it('should show all seasons', (done) => {
    let season = new Season(sampleSeason);
    season.save().then(() => {
      chai.request(app)
        .get('/api/season/all')
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
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

  it('should show a specific season', (done) => {
    let season = new Season(sampleSeason);
    season.save().then((savedSeason) => {
      chai.request(app)
        .get(`/api/season/${savedSeason._id}`)
        // .set('authorization', 'Bearer ' + process.env.TOKEN)
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.status, 200)
            assert.equal(res.body.seasonNumber, 7)
            assert.equal(res.body.seriesType, 'Regular')
            assert.equal(res.body.premiereDate, '2015-03-02T00:00:00.000Z')
            return done()
        })
    })
  })

  it('should POST a new season', (done) => {
    chai.request(app)
        .post('/api/season')
        .set('authorization', 'Bearer ' + process.env.TOKEN)
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .send(sampleSeason)
        .then(res => {
            assert.equal(res.status, 200)
            assert.equal(res.body.seasonNumber, 7)
            assert.equal(res.body.seriesType, 'Regular')
            assert.equal(res.body.premiereDate, '2015-03-02T00:00:00.000Z')
            // assert.isNotEmpty(res.body._id)

        // make sure data actually got added to the database
        Season.find({ seriesType: "Regular", seasonNumber: 7 })
        .then(result => {
          assert.equal(result.length, 1)
        })
        return done()
        }).catch(err => {
            return done(err)
        })
    })

    it("Should be able to delete a Season", (done) => {
        let season = new Season(sampleSeason);
        season.save().then((savedSeason) => {
            chai.request(app)
                .delete(`/api/season/${savedSeason._id}`)
                .end((err, res) => {
                    if (err) {return done(err)};
                    res.status.should.be.equal(200);
                    return done();
                });
        })
    });
})