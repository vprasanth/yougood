# yougood
A quick and dirty health check http micro-server with zero-dependencies for node apps.

## Usage

```javascript
const { ready, notReady, alive, dead, server } = require('yougood');

server.listen(3000);

// signal app is alive
alive()

// finished doing prep work, eg. connect to db
// signal app is ready
ready();

// some problem occures
// e.g. db error listener
// notReady('db connection went just went down'. Date.now());
```

## default endpoints
The following paths are set by default if none are provided. Any other path will return status code 400.

### `/live`
Used to check if app is alive. Returns 200 Ok if things are good, 500 otherwise.

### `/ready`
Used to check if app is ready. Returns 200 Ok if things are good, 500 otherwise.

## Methods

### `ready()`
Call this function to set ready state to true.

### `notReady(msg: string)`
Call this function to set ready state to false. You can also pass an optional
message which will be returned in the body.

### `alive()`
Call this function to set liveliness state to true. This signifies your application
is ready.

### `dead(msg: string)`
Call this function to set liveliness state to false. This signifies your application
is not ready yet. An optional message can be passed which will be returned in the body.
