const bcrypt = require('bcryptjs');

/** hashSync is used to Synchronously generates a hash for the given string.
 * It returns the hashed string */
const hash = pass => bcrypt.hashSync(pass, pass.length);

class UsersDbClient {
  constructor() {
    this.map = new Map([
      ['feli', hash('feli')],
    ]);
  }

  async find(username) {
    return this.map.get(username);
  }

  async register(username, passwordHashed) {
    return this.map.set(username, passwordHashed);
  }
}

module.exports = UsersDbClient;