const CartService = require('../services/CartService');

class CartController {
  static async getCart(req, res) {
    try {
      const { user } = res.locals; // 👈 берём user из verifyAccessToken
      const cart = await CartService.getUserCart(user.id);
      return res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при получении корзины' });
    }
  }

  static async addItem(req, res) {
    try {
      const { user } = res.locals;
      const { itemId, quantity } = req.body;

      if (!itemId) return res.status(400).json({ message: 'Не передан itemId' });

      const cartItem = await CartService.addToCart({
        userId: user.id,
        itemId,
        quantity,
      });

      return res.status(201).json(cartItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при добавлении в корзину' });
    }
  }

  static async removeItem(req, res) {
    try {
      const { user } = res.locals;
      const { itemId } = req.params;

      const deleted = await CartService.removeFromCart({ userId: user.id, itemId });

      if (!deleted) return res.status(404).json({ message: 'Товар не найден в корзине' });

      return res.status(200).json({ message: 'Товар удалён из корзины' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при удалении товара' });
    }
  }

  // 🔥 Изменить количество
  static async updateQuantity(req, res) {
    const { user } = res.locals;
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
      const updated = await CartService.updateQuantity(user.id, itemId, quantity);
      if (!updated) {
        return res.status(404).json({ message: 'Товар не найден в корзине' });
      }
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при обновлении количества' });
    }
  }

  // Удалить один товар
  static async removeFromCart(req, res) {
    const { user } = res.locals;
    const { itemId } = req.params;
    try {
      await CartService.removeFromCart({ userId: user.id, itemId });
      return res.status(200).json({ message: 'Товар удалён' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при удалении товара' });
    }
  }

  static async clearCart(req, res) {
    try {
      const { user } = res.locals;

      const deletedCount = await CartService.clearCart(user.id);

      return res
        .status(200)
        .json({ message: `Корзина очищена (${deletedCount} товаров удалено)` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при очистке корзины' });
    }
  }
}

module.exports = CartController;
