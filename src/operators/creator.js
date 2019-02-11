const FlyingProgram = require( "flying-program" ).Program;

const solver = require( "../utils/solver" );

const prepareCreator = function( api ) {
  const creator = {
    description: "Create entities in the database.",
    async: true,
    declarations: {
      create: {
        input: [ "string", "object|undefined" ],
        function: async function( entity, params = {} ) {
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
    initialize: { function: creator => FlyingProgram( creator ) }
  }
}

module.exports = FlyingProgram( configCreator );
