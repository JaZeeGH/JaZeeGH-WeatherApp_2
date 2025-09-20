import express from "express";
import { accountsController } from './controllers/accounts-controller.js';
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { reportController } from "./controllers/report-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);
router.get("/account", accountsController.userView);
router.post("/updateuser/:id", accountsController.updateUser);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addStation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.get("/station-controller", stationController.index);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", stationController.addReport);
router.get("/station/:stationid/deletereport/:reportid", stationController.deleteReport)
router.get("/about", aboutController.index);