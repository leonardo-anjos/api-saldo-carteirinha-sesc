require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://api-saldo-carteirinha-sesc:o85MyKlijCFJAJKd@cluster0-qnfqt.mongodb.net/dev?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
