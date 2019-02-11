const FlyingProgram = require( "flying-program" ).Program;
const restruct = require( "flying-program" ).restruct;

const template = {
  server: "string",
  path: "string",
  key: "string",
  api_key: "string",
  debug: "boolean?"
}

let validate = {
  description: "Return true if the `input` looks like a valid configuration " +
    "for a `node-civicrm` connection. If it is doesn't look valid, throw " +
    "a string with the reason.",
  declarations: {
    validate: {
      function: function( input ) {
        return restruct( template )( input );
      }
    }
  },
  phone: {
    errorCall: function( call ) {
      throw "Invalid configuration. Expected an object with: " +
        Object.keys( template ).join( ", " ) + ". Received value is of " +
        "type " + typeof call.input + ". Please, revise its: " +
        call.error.path.join( "," );
    }
  }
}

module.exports = FlyingProgram( validate );
