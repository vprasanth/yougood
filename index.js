const http = require('http');
const url = require('url');

const state = {
  ready: {
    state: false,
    msg: null
  },
  liveliness: {
    state: false,
    msg: null
  }
};

function notReady(msg) {
  state.ready.state = false;
  state.ready.msg = msg;
}

function ready() {
  state.ready.state = true;
  state.ready.msg = null;
}

function dead(msg) {
  state.liveliness.state = false;
  state.liveliness.msg = msg;
}

function alive() {
  state.liveliness.state = true;
  state.liveliness.msg = null;
}

function server() {
  const server = http.createServer((req, res) => {
    req.on('error', err => console.error(err));
    res.on('error', err => console.error(err));
    const path = url.parse(req.url).pathname;
    res.setHeader('content-type', 'text/plain');
    // bootleg router
    if (path === '/ready') {
      if (state.ready.state) {
        res.end('Ok');
      } else {
        res.statusCode = 500;
        res.end(state.ready.msg);
      }
    } else if (path == '/live') {
      if (state.liveliness.state) {
        res.end('Ok');
      } else {
        res.statusCode = 500;
        res.end(state.liveliness.msg);
      }
    } else {
      res.statusCode = 400;
      res.end();
    }
  });

  return server;
}

// module.exports = options => {
//   let readyPath = '/ready';
//   let liveliness = '/health';

//   if (options.endpoints) {
//     if (options.endpoints.readyPath) {
//       readyPath = options.endpoints.readyPath;
//     }
//     if (options.endpoints.liveliness) {
//       liveliness = endpoints.liveliness;
//     }
//   }
// };

module.exports = {
  ready,
  notReady,
  dead,
  alive,
  server: server()
};
