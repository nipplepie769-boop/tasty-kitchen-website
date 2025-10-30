const bcrypt = require('bcryptjs');

// Simple in-memory user store for development/testing when MongoDB isn't available
const users = [];

function cloneUser(u) {
  // return a plain object similar to mongoose doc with methods
  if (!u) return null;
  const user = Object.assign({}, u);
  user.comparePassword = async function(candidate) {
    if (!this.password) return false;
    return bcrypt.compare(candidate, this.password);
  };
  return user;
}

module.exports = {
  async findUserByEmail(email) {
    const u = users.find(x => x.email === email);
    return cloneUser(u);
  },
  async findUserByPhone(phone) {
    const u = users.find(x => x.phone === phone);
    return cloneUser(u);
  },
  async saveUser(user) {
    // if has _id treat as update
    if (user._id) {
      const idx = users.findIndex(x => x._id === user._id);
      if (idx >= 0) {
        users[idx] = Object.assign({}, users[idx], user);
        return cloneUser(users[idx]);
      }
    }
    // create new
    const newUser = Object.assign({}, user, { _id: Date.now().toString() });
    // if password provided and not hashed, hash it
    if (newUser.password && !newUser.password.startsWith('$2')) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    users.push(newUser);
    return cloneUser(newUser);
  },
  // helper to upsert by email
  async findOneAndUpsertByEmail(email, data) {
    let u = users.find(x => x.email === email);
    if (u) {
      Object.assign(u, data);
      return cloneUser(u);
    }
    const newUser = Object.assign({}, { email }, data, { _id: Date.now().toString() });
    if (newUser.password && !newUser.password.startsWith('$2')) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    users.push(newUser);
    return cloneUser(newUser);
  }
};
