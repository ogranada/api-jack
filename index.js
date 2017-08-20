
const express = require('express');
const bodyParser = require('body-parser');
const co = require('co');

function Jack(config) {
  config = !config ? {} : config;
  this.PORT = config.port || 6897;
  this.servername = config.name || 'server_' + ((new Date()).getTime());
  this.app = express();
  this.app.use(bodyParser.urlencoded({ extended: false }));
  this.app.use(bodyParser.json());
  this.router = express.Router();
  this.resources = [];
  this.app.get('/api/', (req, res) => {
    res.status(200).json({
      name: this.servername,
      resources: this.resources
    });
  });
}

function processResponse(req, res, rta) {
  if (rta.toString() === '[object Generator]') {
    co(rta)
      .then((p_rta) => {
        res.status(p_rta.status).json(p_rta.response);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      })
      ;
  } else if (typeof rta === 'function') {
    res.status(rta.status).json(rta.response);
  }
}

function getMethod(fields, cb) {
  return function (req, res) {
    let values = [], idx, field;
    for (idx in fields) {
      field = fields[idx];
      values[values.length] = req.query[field];
    }
    processResponse(req, res, cb.apply(this, values));
  };
}

function postMethod(fields, cb) {
  return function (req, res) {
    let values = [], idx, field;
    for (idx in fields) {
      field = fields[idx];
      values[values.length] = req.body[field];
    }
    processResponse(req, res, cb.apply(this, values));
  };
}

function deleteMethod(fields, cb) {
  return function (req, res) {
    processResponse(req, res, cb(req.params.id));
  };
}

Jack.prototype.addResource = function Jack_addResource(resource, fields, methods) {
  const me = this;
  this.resources.push({
    name: resource,
    path: '/api/' + resource,
    fields: fields
  });
  let method, cb;
  let mthdInvocation = {
    get: getMethod,
    post: postMethod,
    put: postMethod,
    patch: postMethod,
    delete: deleteMethod
  };
  let _url;
  for (method in methods) {
    cb = methods[method];
    _url = '/' + resource;
    if (method === 'delete') {
      _url = '/' + resource + '/:id';
    }
    this.router[method](_url, mthdInvocation[method](fields, cb));
  }
}

Jack.prototype.start = function Jack_start(cb) {
  const me = this;
  this.app.use('/api', this.router);
  this.app.listen(this.PORT, function start_cb() {
    cb({
      port: me.PORT
    });
  });
}

module.exports = Jack;
