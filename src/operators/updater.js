const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const solver = require( "../utils/solver" );

const prepareUpdater = function( api ) {
  const updater = {
    description: "Update an entity from the database.",
    async: true,
    declarations: {
      update: {
        input: [ "string", "object|undefined" ],
        function: async function( entity, params = {} ) {
          return await new Promise( ( resolve, reject ) => {
            api.update( entity, params, solver( resolve, reject ) );
          });
        }
      }
    }
  }

  return updater;
}

let configUpdater = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `update` calls.",
  declarations: {
    prepare: { function: prepareUpdater },
    initialize: { function: updater => FlyingProgram( updater ) }
  }
}

module.exports = FlyingProgram( configUpdater );
