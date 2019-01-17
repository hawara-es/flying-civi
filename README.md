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
const civicrm = require( "flying-civi" );

const config = {
  server: "http://127.0.0.1:8080",
  path: "/sites/all/modules/civicrm/extern/rest.php",
  key: "site_key",
  api_key: "api_key"
}

const api = civicrm.execute( config );
```

## Example of use

```js
async function example() {
  let groups = await api.get.executeAsync( "customGroup", {
    extends: "Contact",
    is_multiple: false,
    options: { limit: 0 }
  });

  return await api.get.executeAsync( "customField", {
    custom_group_id: groups.values.map( g => g.name ),
    options: { limit: 0 }
  });
}

example().then( r => console.log( r.values ) ).catch( console.error );
```
