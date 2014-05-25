var should = require( 'should' );
var coke   = require( 'coke' );

describe( 'Test COKE Model usage outside of the app', function (){
  it( 'should retrieve an user object', function ( done ){
    coke.setup_models( '/var/www/coke-dev/', function ( model_names ){
      var User = Model( 'User' );

      User.findOne( function ( err, user ){
        should.not.exist( err );

        user.should.be.an.Object;
        console.log( user );
        done();
      });
    });
  });
});
