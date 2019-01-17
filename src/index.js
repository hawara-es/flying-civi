const FlyingProgram = require( "flying-program" ).Program;
const civicrm = require( "civicrm" );

const actions = {
  get: require( "./actions/get" ),
  create: require( "./actions/create" ),
  update: require( "./actions/update" ),
  delete: require( "./actions/delete" ),
  action: require( "./actions/action" )
}

const civicrmAPI = {
  description: "Connect to a CiviCRM database using its REST API through " +
    "the `node-civicrm` module.",
  declarations: {
    config: {
      function: function( config ) {
        const api = civicrm( config );
        return {
          get: actions.get.execute( api ),
          create: actions.create.execute( api ),
          update: actions.update.execute( api ),
          delete: actions.delete.execute( api ),
          action: actions.action.execute( api )
        }
      }
    },
  }
}

module.exports = new FlyingProgram( civicrmAPI );
