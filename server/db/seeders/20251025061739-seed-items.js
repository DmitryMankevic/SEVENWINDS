'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        name: 'Нимбус 2000',
        desc: 'Легендарная метла, отличающаяся скоростью и лёгкостью управления.',
        price: 1200,
        image: '/Bright_spark_broom_2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Нимбус 2001',
        desc: 'Улучшенная версия, популярна среди команды Слизерина.',
        price: 1500,
        image: '/Family_antique_broom.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Огненная молния',
        desc: 'Самая быстрая метла в мире, идеальна для профессиональных игроков.',
        price: 2500,
        image: '/Hogwarts_house_broom_2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Комета 260',
        desc: 'Надёжная модель для начинающих волшебников.',
        price: 600,
        image: '/Lickety_swift_broom.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Звёздный Шторм',
        desc: 'Изысканная метла с мягким скольжением, созданная мастерами Равенкло.',
        price: 1300,
        image: '/Moon_trimmer_broom_2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Пуховая Молния',
        desc: 'Лёгкая и манёвренная, идеально подходит для полётов над озером.',
        price: 850,
        image: '/Night_dancer_broom.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Лунный Ветер',
        desc: 'Редкая модель, светящаяся в ночном небе.',
        price: 1700,
        image: '/Silver_arrow_broom.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Молния Гриффиндора',
        desc: 'Украшена золотыми линиями и гербом факультета.',
        price: 2000,
        image: '/Sky_scythe_broom.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Серебряное Перо',
        desc: 'Создана на заказ для магов Когтеврана, устойчива к сильным ветрам.',
        price: 1400,
        image: '/Wild_fire_broom.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Тень Слизерина',
        desc: 'Тёмная, стремительная метла с блестящим изумрудным ободком.',
        price: 1600,
        image: '/Wind_wisp_broom_2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
