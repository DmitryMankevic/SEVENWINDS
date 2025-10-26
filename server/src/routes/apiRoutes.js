const express = require('express');
const authRouter = require('./authRoutes');
const itemRouter = require('./itemRoutes');
const cartRouter = require('./cartRoutes');
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/items', itemRouter);
apiRouter.use('/cart', cartRouter);


module.exports = apiRouter;
