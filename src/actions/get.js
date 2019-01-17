const FlyingProgram = require( "flying-program" ).Program;
const rejectOrResolve = require( "./utils/reject-or-resolve" );

const prepareGetter = function( api ) {
  const getter = {
    description: "Get an entity from the database.",
    async: true,
    declarations: {
      get: {
        input: [ "string", "object" ],
        function: async function( entity, params ) {
          return await new Promise( ( resolve, reject ) => {
            api.get( entity, params, rejectOrResolve( resolve, reject ) );
          });
        }
      }
    }
  }

  return getter;
}

const configGetter = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `get` calls.",
  declarations: {
    prepare: { function: prepareGetter },
    initialize: { function: getter => new FlyingProgram( getter ) }
  }
}

module.exports = new FlyingProgram( configGetter );
