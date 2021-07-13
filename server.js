const stripe = require('stripe')('sk_test_51J3WxqBbP3JGRmwnlOm3W0XvrqBx1aknUKvFAY4ivYo4Scbu2PjQofwWTSWyOqjbTg0RTuXe2kwnfY125CA8yYzH00u1HBcs7I');
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'https://guappjolotas.netlify.app/';

app.post('/create-checkout-session', async (req, res) => {
  let products = req.body.carrito;
  console.log(req.body.carrito)

  let arrayProducts = [];
  
  products.forEach(element => {
    let lineProduct = {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: element.nombre,
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: element.precio,
        },
        quantity: element.cantidad,
      }
      arrayProducts.push(lineProduct)
});

  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: arrayProducts,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url)
});

app.listen((config.PORT || 5000), () => console.log('Running on port 4242'));