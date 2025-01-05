"use strict";

// import all required modules
import logger from "../utils/logger.js";
import Formula1Store from "../models/formula1-store.js";
import { v4 as uuidv4 } from "uuid";
import accounts from './accounts.js';

const formula1 = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const Formula1Id = request.params.id;
    logger.debug("Formula 1 id = " + Formula1Id);
    if (loggedInUser) {
    const viewData = {
      title: "Formula1",
      formula1: Formula1Store.getFormula1(Formula1Id),
    };
    logger.info("about to render", viewData.Formula1);
    response.render("formula1", viewData);
      }
      else response.redirect('/');
  },
    
  deleteRace(request, response) {
    const Formula1Id = request.params.id;
    const raceId = request.params.raceid;
    logger.debug(`Deleting Races ${raceId} from Formula1 ${Formula1Id}`);
    Formula1Store.removeRace(Formula1Id, raceId);
    response.redirect("/Formula1/" + Formula1Id);
  },

  addRace(request, response) {
    const formula1Id = request.params.id;
    const formula1 = Formula1Store.getFormula1(formula1Id);
    const newRace = {
      id: uuidv4(),
       name: request.body.name,
      type: request.body.type,
      length: request.body.length,
      laps: request.body.laps,
    };
    Formula1Store.addRace(formula1Id, newRace);
    response.redirect("/formula1/" + formula1Id);
  },

  updateRace(request, response) {
    const Formula1Id = request.params.id;
    const raceId = request.params.raceid;
    logger.debug("updating race " + raceId);
    const updatedRace = {
      id: raceId,
      name: request.body.name,
      type: request.body.type,
      length: request.body.length,
      laps: request.body.laps,
    };
    Formula1Store.editRace(Formula1Id, raceId, updatedRace);
    response.redirect("/formula1/" + Formula1Id);
  },
};

export default formula1;
