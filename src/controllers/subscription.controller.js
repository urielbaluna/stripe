const { request, response } = require('express');
const client = require('../database/connect.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function subscribeUser(req = request, res = response) {
  const { userId, idPriceSubscription } = req.params;
  try {
    console.log(idPriceSubscription);
    
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: idPriceSubscription,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: "https://lebiom.com/wp-content/uploads/2021/05/pago_exitoso.jpg",
        cancel_url: "https://lacnic.zendesk.com/hc/article_attachments/21622327246231"
    });
    res.status(201).json({
      message: 'Session created',
      sessionId: session.id,  
      userId,
      url: session.url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Internal server error',
      error 
    });
  }
}

async function getCheckoutSession(req = request, res = response) {
  const { sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Internal server error',
      error 
    });
  }
}

module.exports = {
    subscribeUser,
    getCheckoutSession,
};