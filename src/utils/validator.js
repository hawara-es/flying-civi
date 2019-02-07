const FlyingProgram = require( "flying-program" ).Program;
const restruct = require( "flying-program" ).restruct;
const copy = require( "flying-program" ).copies.unfiltered;

const template = {
  server: "string",
  path: "string",
  key: "string",
  api_key: "string",
  debug: "boolean?"
}

const validate = restruct( template );

let validator = {
  description: "Return true if the `input` looks like a valid configuration " +
    "for a `node-civicrm` connection. If it is doesn't look valid, throw " +
    "a string with the reason.",
  declarations: {
    validate: {
      function: function( input ) {
        return validate( input );
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

const source = copy( validator );
validator = new FlyingProgram( validator );

module.exports = {
  validate: validator.execute.bind( validator ),
  source: source
}
