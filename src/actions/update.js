const FlyingProgram = require( "flying-program" ).Program;
const rejectOrResolve = require( "./utils/reject-or-resolve" );

const prepareUpdater = function( api ) {
  const updater = {
    description: "Update an entity from the database.",
    async: true,
    declarations: {
      update: {
        input: [ "string", "object" ],
        function: async function( entity, params ) {
          return await new Promise( ( resolve, reject ) => {
            api.update( entity, params, rejectOrResolve( resolve, reject ) );
          });
        }
      }
    }
  }

  return updater;
}

const configUpdater = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `update` calls.",
  declarations: {
    prepare: { function: prepareUpdater },
    initialize: { function: updater => new FlyingProgram( updater ) }
  }
}

module.exports = new FlyingProgram( configUpdater );
