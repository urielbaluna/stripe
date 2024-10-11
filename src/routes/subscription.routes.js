const express = require('express');
const routes = express.Router();
const { subscribeUser, getCheckoutSession } = require('../controllers/subscription.controller.js');

routes.put('/subscribe/:userId/:idPriceSubscription', subscribeUser);
routes.get('/checkout/:sessionId', getCheckoutSession);

module.exports = routes;