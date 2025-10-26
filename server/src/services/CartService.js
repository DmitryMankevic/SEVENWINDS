const { Cart, Item } = require('../../db/models');

class CartService {
  static async getUserCart(userId) {
    const cart = await Cart.findAll({
      where: { userId },
      include: [Item],
    });
    return cart;
  }

  static async addToCart({ userId, itemId, quantity = 1 }) {
    // Проверяем, есть ли уже такая метла в корзине
    const existing = await Cart.findOne({ where: { userId, itemId } });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return existing;
    }
    // Если нет — создаём новую запись
    const newCartItem = await Cart.create({ userId, itemId, quantity });
    return newCartItem;
  }

  //  Изменить количество
  static async updateQuantity(userId, itemId, quantity) {
    const cartItem = await Cart.findOne({ where: { userId, itemId } });
    if (!cartItem) return null;

    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  }

  static async removeFromCart({ userId, itemId }) {
    const deletedCart = await Cart.destroy({ where: { userId, itemId } });
    return deletedCart;
  }

  static async clearCart(userId) {
    const deletedCart = await Cart.destroy({ where: { userId } });
    return deletedCart;
  }
}

module.exports = CartService;
