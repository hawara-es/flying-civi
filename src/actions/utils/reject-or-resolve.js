const rejectOrResolve = function( resolve, reject ) {
  return function( result ) {
    if( result.is_error )
      reject( result.error_message );
    else
      resolve( result );
  }
}

module.exports = rejectOrResolve;
