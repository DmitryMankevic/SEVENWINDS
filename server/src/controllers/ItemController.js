const ItemService = require('../services/ItemService');
const { Item } = require('../../db/models');

class ItemController {
  static async getAllItems(req, res) {
    try {
      const items = await ItemService.getAllItems();
      if (items.length === 0) return res.status(400).json({ message: 'No items found' });
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  static async getItemById(req, res) {
    const { id } = req.params;
    try {
      const oneItem = await ItemService.getItemById(id);
      if (!oneItem) return res.status(400).json({ message: 'Item not found' });
      return res.status(200).json(oneItem);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  static async createItem(req, res) {
    const { user } = res.locals; // потому что использую на роуте verifyAccessToken
    if (!req.body) return res.status(400).json({ message: 'Нет данных' });
    const { name, desc } = req.body;
    const { isValid, err } = Item.validate({ name, desc });
    if (!isValid) return res.status(400).json({ message: err });
    try {
      const newItem = await ItemService.createItem({
        name,
        desc,
        userId: user.id,
      });
      return res.status(201).json(newItem);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  static async updateItem(req, res) {
    if (!req.body) return res.status(400).json({ message: 'Нет данных' });
    const { name, desc } = req.body;
    const { isValid, err } = Item.validate({ name, desc });
    if (!isValid) return res.status(400).json({ message: err });
    const { id } = req.params;
    try {
      const updatedItem = await ItemService.updateItem({
        id,
        name,
        desc,
      });
      if (!updatedItem) return res.status(400).json({ message: 'Item not found' });
      return res.status(200).json(updatedItem);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }

  static async deleteItem(req, res) {
    const { user } = res.locals; // потому что использую на роуте verifyAccessToken
    const { id } = req.params;
    try {
      const deletedItem = await ItemService.deleteItem(id, user.id);
      if (!deletedItem) return res.status(400).json({ message: 'Item not found' });
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}

module.exports = ItemController;
