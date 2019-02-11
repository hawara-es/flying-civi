const FlyingProgram = require( "flying-program" ).Program;
const civicrm = require( "civicrm" );
const validate = require( "./utils/validate" );

const prepare = {
  getter: require( "./operators/getter" ),
  creator: require( "./operators/creator" ),
  updater: require( "./operators/updater" ),
  deleter: require( "./operators/deleter" ),
  caller: require( "./operators/caller" )
}

let civicrmAPI = {
  description: "Connect to a CiviCRM database using its REST API through " +
    "the `node-civicrm` module.",
  declarations: {
    config: {
      input: [ "object" ],
      function: function( config ) {
        validate( config );
        const api = civicrm( config );

        return {
          get: prepare.getter( api ),
          create: prepare.creator( api ),
          update: prepare.updater( api ),
          delete: prepare.deleter( api ),
          call: prepare.caller( api )
        }
      }
    }
  }
}

module.exports = FlyingProgram( civicrmAPI );
