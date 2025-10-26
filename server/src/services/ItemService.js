const { Item } = require('../../db/models');

class ItemService {
  static async getAllItems() {
    const items = await Item.findAll();
    return items;
  }

  static async getItemById(id) {
    const item = await Item.findByPk(id);
    return item;
  }

  static async createItem({ name, desc, userId }) {
    const item = await Item.create({ name, desc, userId });
    return item;
  }

  static async updateItem({ id, name, desc }) {
    const item = await this.getItemById(id);
    if (item) {
      await item.update({ name, desc });
    }
    return item;
  }

  static async deleteItem(id) {
    const item = await this.getItemById(id);
    if (item) {
      await item.destroy();
    }
    return item;
  }
}

module.exports = ItemService;
