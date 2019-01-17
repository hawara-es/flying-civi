const FlyingProgram = require( "flying-program" ).Program;
const rejectOrResolve = require( "./utils/reject-or-resolve" );

const prepareDeleter = function( api ) {
  const deleter = {
    description: "Delete entities from the database.",
    async: true,
    declarations: {
      delete: {
        input: [ "string", "object" ],
        function: async function( entity, params ) {
          return await new Promise( ( resolve, reject ) => {
            api.delete( entity, params, rejectOrResolve( resolve, reject ) );
          });
        }
      }
    }
  }

  return deleter;
}

const configDeleter = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `delete` calls.",
  declarations: {
    prepare: { function: prepareDeleter },
    initialize: { function: deleter => new FlyingProgram( deleter ) }
  }
}

module.exports = new FlyingProgram( configDeleter );
