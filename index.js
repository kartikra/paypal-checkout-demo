
const config = {
  mode: 'sandbox', // or 'live'
  username: '',
  password: '',
  signature: '',
  redirect_url: 'https://www.sandbox.paypal.com/'
}

var Paypal = require('paypal-nvp-api');
const paypal = Paypal(config);

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.listen(3000, () => console.log('app listening on port 3000!'))
//app.get('/', (req, res) => res.send('Hello World!'))
app.use(bodyParser.json());

app.post('/nvp-setec', (req, res)=>{
    paypal.request('SetExpressCheckout', req.body.query).then((result) => {
        console.log(result)
        console.log(config.redirect_url + 'checkoutnow?token='+result.TOKEN);
        res.send({redirect:config.redirect_url + 'checkoutnow?token='+result.TOKEN})
      }).catch((err) => {
        console.trace(err);
      });    
})

app.post('/nvp-post', (req,res) =>{
    paypal.request(req.body.method, req.body.query).then((result) => {
        //console.log(result)
        res.send(result)
      }).catch((err) => {
        console.trace(err);
      });
})

app.get('/nvp-get', (req,res) =>{
  paypal.request(req.body.method, req.body.query).then((result) => {
      //console.log(result)
      res.send(result)
    }).catch((err) => {
      console.trace(err);
    });
})

