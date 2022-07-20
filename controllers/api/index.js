const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const requirementRoutes = require('./requirement-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/requirements', requirementRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
