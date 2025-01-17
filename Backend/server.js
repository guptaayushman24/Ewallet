// Creating the server for the app
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const database = require('./database')
const bodyParser = require('body-parser');
// Body Parser will format the data so that it will store in the mongodb
app.use(bodyParser.json());
const usersignuproute = require('./routes/usersignupapi');
const bankapi = require('./routes/bankdetailapi');
const walletapi = require('./routes/walletapi');
const transactionhistory = require('./routes/transaction_history_api');
app.use('/signup',usersignuproute);
app.use('/bank',bankapi);
app.use('/wallet',walletapi);
app.use('/transaction',transactionhistory);
// Creating the lister where server will run

app.listen(5000, () => {

    console.log('Server is running on the local host 5000');

})
