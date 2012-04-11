var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Model = {

  User : new Schema({

    name : { type : String, required : true, index : { unique : true, dropDups : true }},

    email : { type : String, required : true },

    created_at : { type : Number, 'default' : Date.now },

    updated_at : { type : Number, 'default' : Date.now }

  })
};



// auto update `updated_at` on save
Object.keys( Model ).forEach( function ( model ){
  if( Model[ model ].tree.updated_at !== undefined ){
    Model[ model ].pre( 'save', function ( next ){
      this.updated_at = Date.now();
      next();
    });
  }
});



module.exports = Model;