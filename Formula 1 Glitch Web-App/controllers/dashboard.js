"use strict";

// import all required modules
import logger from "../utils/logger.js";
import formula1Store from "../models/formula1-store.js";
import { v4 as uuidv4 } from "uuid";
import accounts from "./accounts.js";

// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Formula 1 Dashboard",
        formula1: formula1Store.getAllFormula1(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      };
      logger.info("about to render" + viewData.formula1);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteFormula1(request, response) {
    const formula1Id = request.params.id;
    logger.debug(`Deleting Formula 1 ${formula1Id}`);
    formula1Store.removeFormula1(formula1Id);
    response.redirect("/dashboard");
  },

  addFormula1(request, response) {
     const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newFormula1 = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      type: request.body.type,
      location: request.body.location,
      picture: request.files.picture,
      date: date,
      Races: [],
    };
    logger.debug("Creating a new Formula 1" + newFormula1);
    formula1Store.addFormula1(newFormula1, function () {
      response.redirect("/dashboard");
    });
  },
};

// export the dashboard module
export default dashboard;
