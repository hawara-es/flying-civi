const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const solver = require( "../utils/solver" );

const prepareCreator = function( api ) {
  const creator = {
    description: "Create entities in the database.",
    async: true,
    declarations: {
      create: {
        input: [ "string", "object" ],
        function: async function( entity, params ) {
          return await new Promise( ( resolve, reject ) => {
            api.create( entity, params, solver( resolve, reject ) );
          });
        }
      }
    }
  }

  return creator;
}

let configCreator = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `create` calls.",
  declarations: {
    prepare: { function: prepareCreator },
    initialize: {
      function: function( creator ) {
        return {
          program: new FlyingProgram( creator ),
          source: copy( creator )
        }
      }
    },
    export: {
      function: function( creator ) {
        return {
          create: creator.program.executeAsync.bind( creator.program ),
          source: copy( creator )
        }
      }
    }
  }
}

const source = copy( configCreator );
configCreator = new FlyingProgram( configCreator );

module.exports = {
  config: configCreator.execute.bind( configCreator ),
  source: source
}
