var session = require( 'express-session' );
var conf    = CONF.session;
var db      = CONF.db;
var opt     = { db : UTILS.db()};

if( conf.collection ) opt.collection = conf.collection;
if( db.username )     opt.username   = db.username;
if( db.password )     opt.password   = db.password;

module.exports = function (){
  var Store = require( 'connect-mongo' )( session );

  return session({
    cookie            : { maxAge : 3600000 },// 60 minutes
    proxy             : true,
    secret            : CONF.cookie.secret,
    store             : new Store( opt ),
    saveUninitialized : true,
    resave            : true
  });
};
