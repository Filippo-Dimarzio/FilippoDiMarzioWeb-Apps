"use strict";

// import all required modules
import logger from "../utils/logger.js";
// import principalsStore from "../models/principals-store.js";
import accounts from './accounts.js';


// create about object
const about = {
  // index method - responsible for creating and rendering the view
  
  index(request, response) {
  const loggedInUser = accounts.getCurrentUser(request);
    // display confirmation message in log
    logger.info('about rendering');
    if (loggedInUser) {
      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: 'About the Formula 1 App',
        
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      // render the about view and pass through the data
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },  
};

// export the about module
export default about;
