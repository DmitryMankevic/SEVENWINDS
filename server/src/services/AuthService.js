const { User } = require('../../db/models');

class AuthService {
  static async register({ email, firstName, lastName, password, faculty }) {
    // user - найден или создан
    // created - false - user найден
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { firstName, lastName, password, faculty },
    });

    return { user, created };
  }

  static async getUserByEmail({ email }) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

module.exports = AuthService;
