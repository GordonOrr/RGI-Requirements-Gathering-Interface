const router = require('express').Router();
const sequelize = require('../config/connection');
const { Requirements, User, Comment, ContributorLog } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Requirements.findAll({
    where: {
      user_id: req.session.user_id
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
        attributes: ['comment_id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
      res.render('dashboard', { requirements, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Requirements.findByPk(req.params.id, {
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
      if (dbReqData) {
        const requirement = dbReqData.get({ plain: true });
        
        res.render('edit-requirement', {
          requirement,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
