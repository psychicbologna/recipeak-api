const AuthService = {

  getUserWithUsername(db, user_name) {
    return db('users')
      .where({ user_name })
      .first();
  },

  parseBasicToken(token) {
    return Buffer.from(token, 'base64')
      .toString()
      .split(':');
  }
};

module.exports = AuthService;