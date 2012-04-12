/**
 * Module dependencies.
 * @private
 */
var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Model = {

  User : new Schema({
    name : { type : String, required : true, index : true },
    email : { type : String },
    created_at : { type : Number, 'default' : Date.now },
    updated_at : { type : Number }
  })
};

// auto update `updated_at` on save
Object.keys( Model ).forEach( function ( model ){
  if( Model[ model ].tree.updated_at !== undefined ){
    Model[ model ].pre( 'save', function ( next ){
      this.updated_at = this.isNew?
        this.created_at :
        Date.now();

      next();
    });
  }
});

/**
 * Exports module.
 */
module.exports = Model;