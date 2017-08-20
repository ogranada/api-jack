
const express = require('express');
const bodyParser = require('body-parser');

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

function getMethod(fields, cb) {
  return function (req, res) {
    let values = [], idx, field;
    for (idx in fields) {
      field = fields[idx];
      values[values.length] = req.query[field];
    }
    const rta = cb.apply(this, values);
    res.status(rta.status).json(rta.response);
  };
}

function postMethod(fields, cb) {
  return function (req, res) {
    let values = [], idx, field;
    for (idx in fields) {
      field = fields[idx];
      values[values.length] = req.body[field];
    }
    const rta = cb.apply(this, values);
    res.status(rta.status).json(rta.response);
  };
}

function deleteMethod(fields, cb) {
  return function (req, res) {
    const rta = cb(req.params.id);
    res.status(rta.status).json(rta.response);
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
    if(method === 'delete') {
      _url = '/' + resource+ '/:id';
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
