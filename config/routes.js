module.exports = function ( map ){
  map.get( '/','welcome#index' );
  map.resources( 'users' );
};