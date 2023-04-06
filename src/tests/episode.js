require('dotenv').config()
const app = require("../server")
const mongoose = require('mongoose')
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require("chai-http")
const jwt = require('jsonwebtoken')
// const expect = chai.expect;
const assert = chai.assert

const User = require('../models/user')
const Episode = require('../models/episode')

chai.config.includeStack = true

chai.should()
chai.use(chaiHttp)


// Sample User
const user = {
  username: 'test_user1', 
  password: 'itsasecret'
}

// Sample MS Episode
const sampleEpisode = {
    episodeNumber: 1,
    title: "All Star Talent Show Extravaganza",
    airDate: "2016-08-25T00:00:00.000Z",
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



describe('Nested Episode API endpoints', () => {
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
      Episode.findOneAndRemove({title: "All Star Talent Show Extravaganza"})
      .then(() => done())
    })
  })

  // Test GET All Episodes
  it('should show all episodes', (done) => {
    let episode = new Episode(sampleEpisode);
    episode.save().then(() => {
      chai.request(app)
        .get('/api/season/5e5d8107b99afea2ec5c91b3/episode/')
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

  it('should show a specific episode', (done) => {
    let episode = new Episode(sampleEpisode);
    episode.save().then((savedEpisode) => {
      chai.request(app)
        .get(`/api/season/5e5d8107b99afea2ec5c91b3/episode/${savedEpisode._id}`)
        // .set('authorization', 'Bearer ' + process.env.TOKEN)
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200)
          assert.equal(res.body.episodeNumber, 1)
          assert.equal(res.body.title, "All Star Talent Show Extravaganza")
          assert.equal(res.body.airDate, "2016-08-25T00:00:00.000Z")
          return done()
        })
    })
  })

    it('should POST a new episode nested in season', (done) => {
    chai.request(app)
        .post('/api/season/5e5d8107b99afea2ec5c91b3/episode')
        .set('authorization', 'Bearer ' + process.env.TOKEN)
        // .set('jwtToken', jwt.sign({ username: 'test_user1' }, process.env.JWT_SECRET))
        .send(sampleEpisode)
        .then(res => {
            assert.equal(res.status, 200)
            assert.equal(res.body.episodeNumber, 1)
            assert.equal(res.body.title, "All Star Talent Show Extravaganza")
            assert.equal(res.body.airDate, "2016-08-25T00:00:00.000Z")
            assert.isNotEmpty(res.body._id)

        // make sure data actually got added to the database
        Episode.find({title: "All Star Talent Show Extravaganza"}).then(result => {
          assert.equal(result.length, 1)
        })

        return done()
      }).catch(err => {
        return done(err)
      })
  })

    it("Should be able to delete a Episode", (done) => {
        let episode = new Episode(sampleEpisode);
        episode.save().then((savedEpisode) => {
            chai.request(app)
                .delete(`/api/season/5e5d8107b99afea2ec5c91b3/episode/${savedEpisode._id}`)
                .end((err, res) => {
                    if (err) {return done(err)};
                    res.status.should.be.equal(200);
                    return done();
                });
        })
    });
})