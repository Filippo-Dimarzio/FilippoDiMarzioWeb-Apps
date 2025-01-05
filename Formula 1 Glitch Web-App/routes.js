"use strict";

// import express and initialise router
import express from "express";
const router = express.Router();

// import controllers
import start from "./controllers/start.js";
import dashboard from "./controllers/dashboard.js";
import about from "./controllers/about.js";
import formula1 from "./controllers/Formula1.js";
import accounts from './controllers/accounts.js';

// connect routes to controllers
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/formula1/:id", formula1.index);

router.post("/formula1/:id/addrace", formula1.addRace);
router.post("/formula1/:id/updaterace/:raceid", formula1.updateRace);
router.get("/formula1/:id/deleterace/:raceid", formula1.deleteRace);

router.get("/dashboard/deleteformula1/", dashboard.deleteFormula1);
router.post("/dashboard/addformula1", dashboard.addFormula1);


// export router module
export default router;
