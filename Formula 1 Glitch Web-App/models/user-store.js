'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },

  addUser(user) {
    this.store.addCollection(this.collection, user);
    //add cloudinary details and add ppf pic image tag weeek9
  },
  


};

export default userStore;
