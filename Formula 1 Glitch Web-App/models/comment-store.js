                   "use strict";

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";
import cloudinary from 'cloudinary';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

/*try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}

catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}
*/

const formula1Store = {
  store: new JsonStore("./models/formula1-store.json", {
    formula1Collection: []
  }),
  collection: "formula1Collection",

  getAllFormula1() {
    return this.store.findAll(this.collection);
  },

  getFormula1(id) {
    return this.store.findOneBy(
      this.collection,
      (collection) => collection.id === id
    );
  },
  
  removeRace(id, raceId) {
    const arrayName = "Races";
    this.store.removeItem(this.collection, id, arrayName, raceId);
  },

  removeFormula1(id) {
    const formula1 = this.getFormula1(id);
    this.store.removeCollection(this.collection, formula1);
  },

  removeFormula1() {
    this.store.removeAll(this.collection);
  },

  async addFormula1(formula1, response) {
  function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(formula1.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  formula1.picture = result.url;

  this.store.addCollection(this.collection, formula1);
  response();
},

  addRace(id, race) {
    const arrayName = "Races";
    this.store.addItem(this.collection, id, arrayName, race);
  },

  editRace(id, raceId, updatedRace) {
    const arrayName = "Races";
    this.store.editItem(this.collection, id, raceId, arrayName, updatedRace);
  },
   getUserFormulas(userid) {
    return this.store.findBy(this.collection, (formula1 => formula1.userid === userid));
  },
};

export default formula1Store;
