const router = require('express').Router();
const sequelize = require('../config/connection');
const { Requirements, User, Comment, ContributorLog } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Requirements.findAll({
    attributes: [
      'requirement_id',
      'requirement_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM ContributorLog WHERE requirement.requirement_id = ContributorLog.contribution_id)'), 'contributor_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['comment_id', 'comment_text', 'requirement_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbReqData => {
      const requirements = dbReqData.map(req => req.get({ plain: true }));

      res.render('homepage', {
        requirements,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/requirement/:id', (req, res) => {
  Requirements.findOne({
    where: {
      requirement_id: req.params.id
    },
    attributes: [
      'requirement_id',
      'requirement_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM ContributorLog WHERE requirement.requirement_id = ContributorLog.contribution_id)'), 'contributor_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['comment_id', 'comment_text', 'requirement_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbReqData => {
      if (!dbReqData) {
        res.status(404).json({ message: 'No requirement found with this id' });
        return;
      }

      const requirement = dbReqData.get({ plain: true });

      res.render('single-post', {
        requirement,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
