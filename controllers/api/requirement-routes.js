const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Requirements, User, Comment, ContributorLog } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
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
    .then(dbReqData => res.json(dbReqData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
      res.json(dbReqData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Requirements.create({
    title: req.body.title,
    requirement_url: req.body.requirement_url,
    user_id: req.session.user_id
  })
    .then(dbReqData => res.json(dbReqData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/contributor', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Requirements.upvote({ ...req.body, user_id: req.session.user_id }, { ContributorLog, Comment, User })
    .then(updatedContributorData => res.json(updatedContributorData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Requirements.update(
    {
      title: req.body.title
    },
    {
      where: {
        requirement_id: req.params.id
      }
    }
  )
    .then(dbReqData => {
      if (!dbReqData) {
        res.status(404).json({ message: 'No requirement found with this id' });
        return;
      }
      res.json(dbReqData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Requirements.destroy({
    where: {
      requirement_id: req.params.id
    }
  })
    .then(dbReqData => {
      if (!dbReqData) {
        res.status(404).json({ message: 'No requirement found with this id' });
        return;
      }
      res.json(dbReqData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
