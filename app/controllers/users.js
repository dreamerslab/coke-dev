var User        = Model( 'User' );
var Application = require( CONTROLLER_DIR + 'application' );

module.exports = Application.extend({

  init : function ( before, after ){
    after( this.validation,       { only : [ 'create', 'update' ]});
    after( this.unique,           { only : [ 'create', 'update' ]});
    after( this.record_not_found, { except : [ 'new', 'create', 'index' ]});
  },

  'new' : function ( req, res, next ){
    res.render( 'users/new' );
  },

  create : function ( req, res, next ){
    User.create_or_update( new User(), req.body.user,
      function ( err, user ){
        if( err ) return next( err );

        req.flash( 'flash-info', 'User created' );
        res.redirect( '/users/' + user._id );
      });
  },

  index : function ( req, res, next ){
    User.find( function ( err, users ){
      if( err ) return next( err );

      res.render( 'users/index', {
        users : users
      });
    });
  },

  show : function ( req, res, next ){
    User.findById( req.params.id , function ( err, user ){
      if( user ){
        return res.render( 'users/show', {
          user : user
        });
      }

      req.msg = 'User';
      next( err );
    });
  },

  edit : function ( req, res, next ){
    User.findById( req.params.id , function ( err, user ){
      if( user ){
        return res.render( 'users/edit', {
          user : user
        });
      }

      req.msg = 'User';
      next( err );
    });
  },

  update : function ( req, res, next ){
    User.findById( req.params.id , function ( err, user ){
      if( user ){
        return User.create_or_update( user, req.body.user,
          function ( err, user ){
            if( err ) return next( err );

            req.flash( 'flash-info', 'User updated' );
            res.redirect( '/users/' + user._id );
          });
      }

      req.msg = 'User';
      next( err );
    });
  },

  destroy : function ( req, res, next ){
    User.findById( req.params.id , function ( err, user ){
      if( user ){
        return user.remove( function ( err, user ){
          if( err ) return next( err );

          req.flash( 'flash-info', 'User deleted' );
          res.redirect( '/users' );
        });
      }

      req.msg = 'User';
      next( err );
    });
  }
});
