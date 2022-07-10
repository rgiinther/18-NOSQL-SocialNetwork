const router = require('express').Router();
const UserRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', UserRoutes);

module.exports = router;