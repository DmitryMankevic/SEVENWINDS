const cartRouter = require('express').Router();
const CartController = require('../controllers/CartController');
const {verifyAccessToken} = require('../middlewares/verifyTokens');

cartRouter.use(verifyAccessToken);

cartRouter.get('/', CartController.getCart);
cartRouter.post('/', CartController.addItem);
cartRouter.put('/:itemId', CartController.updateQuantity); // ✅ новый роут
cartRouter.delete('/:itemId', CartController.removeItem);
cartRouter.delete('/', CartController.clearCart);

module.exports = cartRouter;