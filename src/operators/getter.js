const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const solver = require( "../utils/solver" );

const prepareGetter = function( api ) {
  const getter = {
    description: "Get an entity from the database.",
    async: true,
    declarations: {
      get: {
        input: [ "string", "object|undefined" ],
        function: async function( entity, params = {} ) {
          return await new Promise( ( resolve, reject ) => {
            api.get( entity, params, solver( resolve, reject ) );
          });
        }
      }
    }
  }

  return getter;
}

let configGetter = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `get` calls.",
  declarations: {
    prepare: { function: prepareGetter },
    initialize: { function: getter => FlyingProgram( getter ) }
  }
}

module.exports = FlyingProgram( configGetter );
