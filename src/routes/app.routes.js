const {LOGIN,REGISTER,CITAS,LEADS} = require('../global/_var');
const express = require('express');
const routes = express.Router();


const getInfoController = require('../controller/getInfo.Controller');


routes.post(LOGIN,getInfoController.authentication)
routes.post(REGISTER,getInfoController.registerUser)
routes.get(CITAS, getInfoController.getCitas)
routes.get(LEADS, getInfoController.getLeads)


module.exports = routes;