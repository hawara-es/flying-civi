const FlyingProgram = require( "flying-program" ).Program;
const copy = require( "flying-program" ).copies.unfiltered;

const civicrm = require( "civicrm" );

const validator = require( "./utils/validator" );

const operators = {
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
        validator.validate( config );

        const api = civicrm( config );

        const configured = {
          getter: operators.getter.config( api ),
          creator: operators.creator.config( api ),
          updater: operators.updater.config( api ),
          deleter: operators.deleter.config( api ),
          caller: operators.caller.config( api )
        }
        return {
          get: configured.getter.get,
          create: configured.creator.create,
          update: configured.updater.update,
          delete: configured.deleter.delete,
          call: configured.caller.call
        }
      }
    }
  }
}

const source = copy( civicrmAPI );
civicrmAPI = new FlyingProgram( civicrmAPI );

module.exports = {
  config: civicrmAPI.execute.bind( civicrmAPI ),
  source: source
}
