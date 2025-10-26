const express = require('express');
const ItemController = require('../controllers/ItemController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const itemRouter = express.Router();

itemRouter.get('/', ItemController.getAllItems);
itemRouter.post('/', verifyAccessToken, ItemController.createItem);
itemRouter.get('/:id', validateId, ItemController.getItemById);
itemRouter.put('/:id', validateId, ItemController.updateItem);
itemRouter.delete('/:id', validateId, verifyAccessToken, ItemController.deleteItem);

module.exports = itemRouter;
