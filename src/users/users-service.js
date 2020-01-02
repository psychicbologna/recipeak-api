const xss = require('xss'),
  bcrypt = require('bcryptjs');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  hasUserWithUsername(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  getUserIdByUsername(db, username) {
    return db
      .from('users')
      .select('id')
      .where({ username })
      .first();
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  getUserRecipeCount(db, userId) {
    return db
      .from('recipes')
      .select('*')
      .with('user_id', userId)
      .count();
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      username: xss(user.username),
      date_created: new Date(user.date_created)
    };
  },
  
  getAllUserData(db, id) {
    return db
      .from('users')
      .select('users.first_name', 'users.last_name', 'users.username')
      .where('id', id)
      .first();
  },

  getAllUserRecipes(db, userId) {
    return db
      .from('recipes as rec')
      .select('*')
      .where({ user_id: userId });
  },
};

module.exports = UsersService;