const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const solver = require( "../utils/solver" );

const prepareCaller = function( api ) {
  const caller = {
    description: "Call an API action.",
    async: true,
    declarations: {
      call: {
        input: [ "string", "string", "object" ],
        function: async function( entity, action, params ) {
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
    initialize: {
      function: function( caller ) {
        return {
          program: new FlyingProgram( caller ),
          source: copy( caller )
        }
      }
    },
    export: {
      function: function( caller ) {
        return {
          call: caller.program.executeAsync.bind( caller.program ),
          source: caller.source
        }
      }
    }
  }
}

const source = copy( configCaller );
configCaller = new FlyingProgram( configCaller );

module.exports = {
  config: configCaller.execute.bind( configCaller ),
  source: source
}
