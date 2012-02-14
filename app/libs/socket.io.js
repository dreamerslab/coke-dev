exports.init = function( app ){
  var io = require( 'socket.io' ).listen( app );

  io.sockets.on( 'connection', function ( socket ){
    socket.emit( 'news', { hello: 'world' });
    socket.on( 'my other event', function ( data ){
      console.log( data );
    });
  });
};
