const express = require('express');
const { Adddetails , GetAlldetails , removeVideo } = require('../controller/Multiviewer');
const routes = express.Router();

routes.post("/addVideo", Adddetails)
routes.get("/getVideos", GetAlldetails)
routes.delete("/removeVideo/:id/:type", removeVideo)

module.exports = routes;