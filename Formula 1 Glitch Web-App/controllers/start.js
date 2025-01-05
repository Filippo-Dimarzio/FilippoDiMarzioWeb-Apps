"use strict";

// import all required modules
import logger from "../utils/logger.js";
import formula1Store from "../models/formula1-store.js";
import accounts from "./accounts.js";

// create start object
const start = {
  // index method - responsible for creating and rendering the view

  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("start rendering");

    if (loggedInUser) {
      // app statistics calculations

      const formula1 = formula1Store.getAllFormula1();

      let numFormulas = formula1.length;

      let numRaces = 0;

      for (let item of formula1) {
        numRaces += item.Races.length;
      }

      // display confirmation message in log
      logger.info("start rendering");

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: "Welcome to the Formula 1 App!",
        totalFormulas: numFormulas,
        totalRaces: numRaces,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      // render the start view and pass through the data
      response.render("start", viewData);
    }
     else response.redirect("/");
  },
};

// export the start module
export default start;
