import express from "express";
import homeController from "../controllers/HomeController"
let router = express.Router();

let initWebRouters = (app) => {
         router.get("/", homeController.getHomePage);
         // setup get started button, whilelisted doman
         router.post('/setup-profile', homeController.setupProfile);
         // setup presistent menu
         router.post('/setup-persistent-menu', homeController.setupPersistenMenu);
         
         router.post('/webhook', homeController.postWebhook);
         router.get('/webhook', homeController.getWebhook);

         //order
         router.get('/order', homeController.handleOrderApp);
         router.get('/infor', homeController.handleGetInfo);

         return app.use('/', router);
};

module.exports = initWebRouters;
