const sendError = require('./utilityFunctions');
const logger = require('./logger')
const Keys = require('./settings');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthHelper {
  constructor(userDb, secretKey) {
    this.userDb = userDb;
    this.secretKey = secretKey;

    /** The enum used in the API as a type identify */
    this.AuthTypes = Keys.api.AuthTypes;
  }

  useAuth() {
	 return (req, res, next) => {
  	const auth = this.getAuth(req.headers.authorization);
      if (auth.type == Keys.api.AuthTypes.UNKNOWN) {
        return sendError(res, 401, 'unable to authorize');
      }

      this.verify(auth)
      .then(result => {
        if (result) {
          next();
        } else {
          sendError(res, 401, 'Unauthorized');
        }
      }).catch(error => {
        sendError(res, 400, error.messages || error.reason);
      });
    };
  }


  getAuth(authHeader) {
    /** Use Keys for prevent typos error */
    if (authHeader.startsWith(Keys.api.AuthTypes.BASIC)) {
      logger.info(Keys.api.AuthTypes.BASIC)
      return { type: Keys.api.AuthTypes.BASIC, value: this.getBasicAuth(authHeader) };
    } else if (authHeader.startsWith(Keys.api.AuthTypes.BEARER)) {
      return { type: Keys.api.AuthTypes.BEARER, value: this.getBearerAuth(authHeader) };
    } else { return { type: Keys.api.AuthTypes.UNKNOWN }; }
  }

  /** Return username, password */
  getBasicAuth(authHeader){
    /** Regular expression will get first capture group with (.*)
     * if doesn't match will return undefined
      */
    const auth = (/^Basic (.*)/.exec(authHeader) ?? [])[1];
    return Buffer.from(auth, 'base64').toString().split(':'); //Buffer.from() method creates a new buffer filled with the specified string, array, or buffer
  }

  /** Return token */
  getBearerAuth(authHeader){
    /** Regular expression will get first capture group with (.*)
     * if doesn't match will return undefined
      */
    return (/^Bearer (.*)/.exec(authHeader) ?? [])[1];
  }

  async hash(password){
    return await bcrypt.hash(password, password.length);
  }

  async verify(auth){
    switch (auth.type){
      case Keys.api.AuthTypes.BASIC:
        const [username, password] = auth.value;
        const passwordHashed = await this.userDb.find(username);
        return await bcrypt.compare(password, passwordHashed);
      case Keys.api.AuthTypes.BEARER:
        return jwt.verify(auth.value, this.secretKey);
    }
  }

  async getToken(auth){
    switch (auth.type){
      case Keys.api.AuthTypes.BASIC:
        const [username] = auth.value;
        return jwt.sign({username}, this.secretKey);
      case Keys.api.AuthTypes.BEARER:
        return auth.value;
      default:
        return null;
    }
  }

}

module.exports = AuthHelper;