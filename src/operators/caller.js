const FlyingProgram = require( "flying-program" ).Program;

const solver = require( "../utils/solver" );

const prepareCaller = function( api ) {
  const caller = {
    description: "Call an API action.",
    async: true,
    declarations: {
      call: {
        input: [ "string", "string", "object|undefined" ],
        function: async function( entity, action, params = {} ) {
          return await new Promise( ( resolve, reject ) => {
            api.call( entity, action, params, solver( resolve, reject ) );
          });
        }
      }
    }
  }

  return caller;
}

let configCaller = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `action` calls.",
  declarations: {
    prepare: { function: prepareCaller },
    initialize: { function: caller => FlyingProgram( caller ) }
  }
}

module.exports = FlyingProgram( configCaller );
