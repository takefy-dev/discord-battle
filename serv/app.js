require('dotenv').config()
require('./strategies/discord')
const express = require('express'),
  app = express(),
  cors = require('cors'),
  session = require('express-session'),
  passport = require('passport'),
  routes = require('./routes'),
  Database = require('./database'),
  SequelizeStore = require('connect-session-sequelize')(session.Store),
  { secretSessions } = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))

const database = new Database()

app.use(session({
  secret: secretSessions,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  store: new SequelizeStore({
    db: database.database
  }),
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', routes)
app.set('database', database)
global.database = database
app.set('config', require('./config'))
app.listen(process.env.PORT || 5000, () => {
  console.log('loggged in')

})


