module.exports = {

  statics : {
    create_or_update : function ( user, props, callback ){
      user.name  = props.name;
      user.email = props.email;
      user.save( callback );
    }
  }
};
