const FlyingProgram = require( "flying-program" ).Program;
const rejectOrResolve = require( "./utils/reject-or-resolve" );

const prepareCaller = function( api ) {
  const caller = {
    description: "Call an API action.",
    async: true,
    declarations: {
      get: {
        input: [ "string", "string", "object" ],
        function: async function( entity, action, params ) {
          return await new Promise( ( resolve, reject ) => {
            api.call(
              entity, action, params,
              rejectOrResolve( resolve, reject )
            );
          });
        }
      }
    }
  }

  return caller;
}

const configCaller = {
  description: "Receive an opened channel with a CiviCRM database and return " +
    "a program that uses the connection to perform `action` calls.",
  declarations: {
    prepare: { function: prepareCaller },
    initialize: { function: caller => new FlyingProgram( caller ) }
  }
}

module.exports = new FlyingProgram( configCaller );
