const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const solver = require( "../utils/solver" );

const prepareDeleter = function( api ) {
  const deleter = {
    description: "Delete entities from the database.",
    async: true,
    declarations: {
      delete: {
        input: [ "string", "object|undefined" ],
        function: async function( entity, params = {} ) {
          return await new Promise( ( resolve, reject ) => {
            api.delete( entity, params, solver( resolve, reject ) );
          });
        }
      }
    }
  }

  return deleter;
}

let configDeleter = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `delete` calls.",
  declarations: {
    prepare: { function: prepareDeleter },
    initialize: { function: deleter => FlyingProgram( deleter ) }
  }
}

module.exports = FlyingProgram( configDeleter );
