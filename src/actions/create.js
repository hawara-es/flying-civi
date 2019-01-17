const FlyingProgram = require( "flying-program" ).Program;
const rejectOrResolve = require( "./utils/reject-or-resolve" );

const prepareCreator = function( api ) {
  const creator = {
    description: "Create entities in the database.",
    async: true,
    declarations: {
      create: {
        input: [ "string", "object" ],
        function: async function( entity, params ) {
          return await new Promise( ( resolve, reject ) => {
            api.create( entity, params, rejectOrResolve( resolve, reject ) );
          });
        }
      }
    }
  }

  return creator;
}

const configCreator = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `create` calls.",
  declarations: {
    prepare: { function: prepareCreator },
    initialize: { function: creator => new FlyingProgram( creator ) }
  }
}

module.exports = new FlyingProgram( configCreator );
