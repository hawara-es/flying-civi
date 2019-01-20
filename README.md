# FlyingCivi

## Development Stage

Before you keep reading, you must know that this project is still in a
`preview` stage and no official production version has been still released.

The internal structure of this project is meant to change. Also, documentation
and tests are very incomplete. You've been warned!

`FlyingCivi` is a wrapper that makes the Node.js [civicrm](https://github.com/TechToThePeople/node-civicrm) module available
from the (still in development) FlyingProgram's ecosystem.

## Connection

```js
const flyingCivi = require( "flying-civi" );

const config = {
  server: "http://127.0.0.1:8080",
  path: "/sites/all/modules/civicrm/extern/rest.php",
  key: "site_key",
  api_key: "api_key"
}

const civi = flyingCivi.config( config );
```

## Example of use

```js
civi.get( "Contact", { is_deleted: false } ).then( console.log );
```
