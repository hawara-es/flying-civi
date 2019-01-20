const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const solver = require( "../utils/solver" );

const prepareUpdater = function( api ) {
  const updater = {
    description: "Update an entity from the database.",
    async: true,
    declarations: {
      update: {
        input: [ "string", "object" ],
        function: async function( entity, params ) {
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
    initialize: {
      function: function( updater ) {
        return {
          program: new FlyingProgram( updater ),
          source: copy( updater )
        }
      }
    },
    export: {
      function: function( updater ) {
        return {
          update: updater.program.executeAsync.bind( updater.program ),
          source: updater.source
        }
      }
    }
  }
}

const source = copy( configUpdater );
configUpdater = new FlyingProgram( configUpdater );

module.exports = {
  config: configUpdater.execute.bind( configUpdater ),
  source: source
}
