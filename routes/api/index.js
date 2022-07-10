const router = require('express').Router();
const UserRoutes = require('./user-route');
const thoughtsRoutes = require('./thought-route');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', UserRoutes);

module.exports = router;